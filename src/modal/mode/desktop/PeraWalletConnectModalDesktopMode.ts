import QrIcon from "../../../asset/icon/Qr.svg";
import ArrowRight from "../../../asset/icon/Right.svg";
import ArrowLeft from "../../../asset/icon/Left.svg";
import AppStoreIcon from "../../../asset/icon/AppStoreIcon.svg";
import PlayStoreIcon from "../../../asset/icon/PlayStoreIcon.svg";
import DownloadIcon from "../../../asset/icon/Download.svg";
import PeraWalletLogoWithBlackBackground from "../../../asset/icon/PeraWalletWithBlackBackground.svg";
import PeraDownloadQRCode from "../../../asset/img/PeraWalletDownloadQRCode.png";
import PeraWebIcon from "../../../asset/icon/PeraWeb.svg";
import ChevronRightIcon from "../../../asset/icon/ChevronRight.svg";

import QRCodeStyling from "qr-code-styling";

import styles from "./_pera-wallet-connect-modal-desktop-mode.scss";
import accordionStyles from "./accordion/_pera-wallet-accordion.scss";
import {detectBrowser} from "../../../util/device/deviceUtils";

const peraWalletConnectModalDesktopMode = document.createElement("template");
const styleSheet = document.createElement("style");
const accordionStyleSheet = document.createElement("style");

styleSheet.textContent = styles;
accordionStyleSheet.textContent = accordionStyles;

const peraWalletConnectModalDesktopModeDefaultView = `
  <div id="pera-wallet-connect-modal-desktop-mode" class="pera-wallet-connect-modal-desktop-mode pera-wallet-connect-modal-desktop-mode--default">
      <pera-wallet-connect-modal-information-section></pera-wallet-connect-modal-information-section>

      <div class="pera-wallet-connect-modal-desktop-mode__default-view">
        <div class="pera-wallet-accordion-item pera-wallet-accordion-item--active">
          <a class="pera-wallet-accordion-toggle">
            <button class="pera-wallet-accordion-toggle__button"></button>

            <img src="${ArrowRight}" class="pera-wallet-accordion-icon" />

            <div class="pera-wallet-accordion-toggle__content-with-label">
              <div class="pera-wallet-accordion-toggle__content-with-label__text">
                Connect With

                <span class="pera-wallet-accordion-toggle__bold-color">
                  Pera Web
                </span>
              </div>

              <span class="pera-wallet-accordion-toggle__label">NEW</span>
            </div>
          </a>

          <div class="pera-wallet-accordion-item__content">
          ${
            detectBrowser() === "Chrome"
              ? `<div class="pera-wallet-connect-modal-desktop-mode__web-wallet-iframe"></div>`
              : `<div class="pera-wallet-connect-modal-desktop-mode__web-wallet">
          <div
            class="pera-wallet-connect-modal-desktop-mode__web-wallet__logo-wrapper">
            <img src="${PeraWebIcon}" />
          </div>

          <p
            class="pera-wallet-connect-modal-desktop-mode__web-wallet__description">
            Connect with Pera Web to continue
          </p>

          <button
            id="pera-wallet-connect-web-wallet-launch-button"
            class="pera-wallet-connect-modal-desktop-mode__web-wallet__launch-button">
            Launch Pera Web

            <img src="${ChevronRightIcon}" />
          </button>
        </div>`
          }
          </div>
        </div>

        <div class="pera-wallet-accordion-item">
          <a class="pera-wallet-accordion-toggle">
          <button class="pera-wallet-accordion-toggle__button"></button>

            <img src="${ArrowRight}" class="pera-wallet-accordion-icon" />

            <div class="pera-wallet-accordion-toggle__text">
              Connect with

              <span class="pera-wallet-accordion-toggle__bold-color">
                Pera Mobile
              </span>
            </div>
          </a>

          <div class="pera-wallet-accordion-item__content">
            <div id="pera-wallet-connect-modal-connect-qr-code" class="pera-wallet-connect-qr-code-wrapper"></div>

            <div>
              <p
                class="pera-wallet-connect-modal-desktop-mode__download-pera-description">
                  Don’t have Pera Wallet app?
              </p>

              <button
                id="pera-wallet-connect-modal-desktop-mode-download-pera-button"
                class="pera-wallet-connect-modal-desktop-mode__download-pera-button">
                <img src="${QrIcon}" alt="QR Icon" />

                Download Pera Wallet
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="pera-wallet-connect-modal-desktop-mode__download-view">
        <button
          id="pera-wallet-connect-modal-download-pera-view-back-button"
          class="pera-wallet-connect-modal-download-pera-view__back-button">
          <img
            src="${ArrowLeft}"
            alt="Back Arrow"
          />

          Back
        </button>

        <div class="pera-wallet-connect-modal-download-pera-view">
          <h1 class="pera-wallet-connect-modal-download-pera-view__title">
            Download Pera Wallet
          </h1>

          <div class="pera-wallet-download-qr-code-wrapper">
            <img class="pera-wallet-download-qr-code__image" src="${PeraDownloadQRCode}" alt="Download QR Code"/>
          </div>

          <div class="pera-wallet-connect-modal-download-pera-view__footer">
            <a
              id="pera-wallet-connect-modal-download-pera-view-download-ios-link">
              <img src="${AppStoreIcon}" alt="App Store icon" />
            </a>

            <a
              id="pera-wallet-connect-modal-download-pera-view-download-android-link">
              <img src="${PlayStoreIcon}" alt="Play Store icon" />
            </a>

            <a
              id="pera-wallet-connect-modal-download-pera-view-download-apk-link"
              class="pera-wallet-connect-modal-download-pera-view__footer__button">
              <img src="${DownloadIcon}" alt="Download icon" />

              Download APK File
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

peraWalletConnectModalDesktopMode.innerHTML =
  peraWalletConnectModalDesktopModeDefaultView;

export class PeraWalletModalDesktopMode extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});

    if (this.shadowRoot) {
      this.shadowRoot.append(
        peraWalletConnectModalDesktopMode.content.cloneNode(true),
        styleSheet,
        accordionStyleSheet
      );

      this.shadowRoot.addEventListener("click", (event) => {
        this.handleAccordion(event as MouseEvent);
      });
    }
  }

  connectedCallback() {
    this.handleChangeView();
    this.renderQRCode();
    this.initDownloadLinks();

    if (detectBrowser() === "Chrome" && this.shadowRoot) {
      const iframeWrapper = this.shadowRoot.querySelector(
        ".pera-wallet-connect-modal-desktop-mode__web-wallet-iframe"
      );

      if (iframeWrapper) {
        // @ts-ignore ts-2339
        window.onWebWalletConnect(iframeWrapper);
      }
    }
  }

  handleChangeView() {
    const downloadPeraButton = this.shadowRoot?.getElementById(
      "pera-wallet-connect-modal-desktop-mode-download-pera-button"
    );
    const backButton = this.shadowRoot?.getElementById(
      "pera-wallet-connect-modal-download-pera-view-back-button"
    );
    const webWalletLaunchButton = this.shadowRoot?.getElementById(
      "pera-wallet-connect-web-wallet-launch-button"
    );

    if (downloadPeraButton) {
      downloadPeraButton.addEventListener("click", () => {
        this.onClickDownload();
      });
    }

    if (backButton) {
      backButton.addEventListener("click", () => {
        this.onClickBack();
      });
    }

    if (webWalletLaunchButton) {
      webWalletLaunchButton.addEventListener("click", () => {
        this.webWalletConnect();
      });
    }
  }

  initDownloadLinks() {
    const downloadIOS = this.shadowRoot?.getElementById(
      "pera-wallet-connect-modal-download-pera-view-download-ios-link"
    );
    const downloadAndroid = this.shadowRoot?.getElementById(
      "pera-wallet-connect-modal-download-pera-view-download-android-link"
    );
    const downloadAPK = this.shadowRoot?.getElementById(
      "pera-wallet-connect-modal-download-pera-view-download-apk-link"
    );

    if (downloadIOS) {
      downloadIOS.addEventListener("click", () => {
        window.open(
          "https://apps.apple.com/us/app/algorand-wallet/id1459898525",
          "_blank"
        );
      });
    }

    if (downloadAndroid) {
      downloadAndroid.addEventListener("click", () => {
        window.open(
          "https://play.google.com/store/apps/details?id=com.algorand.android",
          "_blank"
        );
      });
    }

    if (downloadAPK) {
      downloadAPK.addEventListener("click", () => {
        window.open(
          "https://pera-wallet.s3.ap-southeast-1.amazonaws.com/pera-wallet.apk",
          "_blank"
        );
      });
    }
  }

  webWalletConnect() {
    // @ts-ignore ts-2339
    window.onWebWalletConnect();
  }

  handleAccordion(event: MouseEvent) {
    event.preventDefault();

    if (event.target instanceof Element) {
      if (!event.target.classList.contains("pera-wallet-accordion-toggle__button"))
        return;

      if (this.shadowRoot && event.target.parentElement?.parentElement) {
        const accordionItem = event.target.parentElement?.parentElement;

        if (!accordionItem) return;

        if (accordionItem.classList.contains("pera-wallet-accordion-item--active")) {
          return;
        }

        const accordionItems = this.shadowRoot.querySelectorAll(
          ".pera-wallet-accordion-item.pera-wallet-accordion-item--active"
        );

        for (let i = 0; i < accordionItems.length; i++) {
          accordionItems[i].classList.remove("pera-wallet-accordion-item--active");
        }

        accordionItem.classList.toggle("pera-wallet-accordion-item--active");
      }
    }
  }

  renderQRCode() {
    const URI = this.getAttribute("uri");

    if (URI) {
      const qrCode = new QRCodeStyling({
        width: 205,
        height: 205,
        type: "svg",
        data: URI,
        image: PeraWalletLogoWithBlackBackground,
        dotsOptions: {
          color: "#000",
          type: "extra-rounded"
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10
        },
        cornersSquareOptions: {type: "extra-rounded"},
        cornersDotOptions: {
          type: "dot"
        }
      });

      const qrWrapper = this.shadowRoot?.getElementById(
        "pera-wallet-connect-modal-connect-qr-code"
      );

      if (qrWrapper) {
        qrCode.append(qrWrapper);
      }
    }
  }

  onClickDownload() {
    if (this.shadowRoot) {
      const modalDesktopMode = this.shadowRoot.getElementById(
        "pera-wallet-connect-modal-desktop-mode"
      );

      if (modalDesktopMode) {
        modalDesktopMode.classList.remove(
          "pera-wallet-connect-modal-desktop-mode--default"
        );

        modalDesktopMode.classList.add(
          "pera-wallet-connect-modal-desktop-mode--download"
        );
      }
    }
  }

  onClickBack() {
    if (this.shadowRoot) {
      const modalDesktopMode = this.shadowRoot.getElementById(
        "pera-wallet-connect-modal-desktop-mode"
      );

      if (modalDesktopMode) {
        modalDesktopMode.classList.add("pera-wallet-connect-modal-desktop-mode--default");

        modalDesktopMode.classList.remove(
          "pera-wallet-connect-modal-desktop-mode--download"
        );
      }
    }
  }
}
