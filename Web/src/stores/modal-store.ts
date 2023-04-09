﻿import { makeAutoObservable } from "mobx";
import { ReactElement } from "react";

interface Modal {
  open: boolean;
  body?: ReactElement;
}

export default class ModalStore {
  modal: Modal = {
    open: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (content: ReactElement) => {
    this.modal.open = true;
    this.modal.body = content;
  };

  closeModal = () => {
    this.modal.open = false;
    this.modal.body = undefined;
  };
}
