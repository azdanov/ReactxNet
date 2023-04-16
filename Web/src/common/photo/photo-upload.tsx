import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { Cropper } from "react-cropper";
import { useDropzone } from "react-dropzone";
import { Button, Grid, Header, Icon } from "semantic-ui-react";

interface Props {
  loading: boolean;
  uploadPhoto: (file: Blob) => void;
}

interface DropzoneFile extends File {
  preview: string;
}

const dropzoneStyles = {
  cursor: "pointer",
  border: "dashed 3px #eee",
  borderColor: "#eee",
  borderRadius: "5px",
  paddingTop: "30px",
  textAlign: "center" as const,
  height: "200px",
};

const dropzoneActive = {
  borderColor: "green",
};

function PhotoUpload({ loading, uploadPhoto }: Props) {
  const [files, setFiles] = useState<DropzoneFile[]>([]);
  const [cropper, setCropper] = useState<Cropper>();

  const revokeObjectUrls = useCallback((files: DropzoneFile[]) => {
    for (const file of files) {
      URL.revokeObjectURL(file.preview);
    }
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      revokeObjectUrls(files);
      setFiles(
        acceptedFiles.map(
          (file: File): DropzoneFile =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
        )
      );
    },
    [files, revokeObjectUrls, setFiles]
  );

  useEffect(() => {
    return () => {
      revokeObjectUrls(files);
    };
  }, [revokeObjectUrls, files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function handleCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
    }
  }

  return (
    <>
      <Grid columns={3} relaxed="very">
        <Grid.Column>
          <Header color="blue" sub content="Step 1 - Add Photo" />
          <div
            {...getRootProps()}
            style={
              isDragActive
                ? { ...dropzoneStyles, ...dropzoneActive }
                : dropzoneStyles
            }
          >
            <input {...getInputProps()} />
            <Icon name="upload" size="huge" />
            <Header>
              Drag image here or <br />
              Select Image
            </Header>
          </div>
        </Grid.Column>
        <Grid.Column>
          <Header sub color="blue" content="Step 2 - Resize photo" />
          {files.length > 0 && (
            <Cropper
              src={files[0].preview}
              style={{ height: 200, width: "100%" }}
              initialAspectRatio={1}
              aspectRatio={1}
              preview=".img-preview"
              guides={false}
              viewMode={1}
              autoCropArea={1}
              background={false}
              onInitialized={setCropper}
            />
          )}
        </Grid.Column>
        <Grid.Column>
          <Header sub color="blue" content="Step 3 - Confirm Photo" />
          {files.length > 0 && (
            <>
              <div
                className="img-preview"
                style={{ minHeight: 200, overflow: "hidden" }}
              />
              <Button.Group widths={2} style={{ width: 200 }}>
                <Button
                  loading={loading}
                  onClick={handleCrop}
                  positive
                  icon="check"
                />
                <Button
                  disabled={loading}
                  onClick={() => {
                    revokeObjectUrls(files);
                    setFiles([]);
                  }}
                  icon="close"
                />
              </Button.Group>
            </>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
}

export default observer(PhotoUpload);
