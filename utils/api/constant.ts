import { randomIp, randomVisitorId } from "./function";

export const context = {
  client: {
    hl: "en",
    gl: "ID",
    remoteHost: randomIp(),
    deviceMake: "",
    deviceModel: "",
    visitorData: randomVisitorId(),
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0,gzip(gfe)",
    clientName: "WEB_REMIX",
    clientVersion: "1.20240522.01.00",
    osName: "X11",
    osVersion: "",
    originalUrl: "https://music.youtube.com/",
    platform: "DESKTOP",
    clientFormFactor: "UNKNOWN_FORM_FACTOR",
    configInfo: {
      appInstallData:
        "CI6a77IGEOOt_xIQ6sOvBRCt47AFEM34sAUQ0I2wBRCs2LAFEOz2sAUQ2eWwBRC--a8FEOvbsAUQvZmwBRDvzbAFEMf9tyIQntCwBRDus7AFEIvysAUQkLKwBRDT4a8FEP3qsAUQ5PSwBRDV3bAFEPOhsAUQy_KwBRD567AFEIO_sAUQt6uwBRDwnLAFEP6j_xIQyfevBRCn47AFEKLosAUQ97H_EhDX9bAFENH4sAUQz6iwBRD72rAFEPzwsAUQuvSwBRCIh7AFEMj4sAUQrOqwBRCW3LAFELDusAUQzu6wBRDQ-LAFELfvrwUQ65OuBRD-8LAFEPur_xIQiOOvBRC-irAFEKvvsAUQmvCvBRDIrv8SEKKBsAUQ1uewBRD0q7AFEOK4sAUQn-iwBRDz67AFEL22rgUQ49GwBRCq2LAFEJb7sAUQiuywBRCT77AFEKTtsAUQ2cmvBRCWn_8SEJaVsAUQopKwBRCPxrAFEKXC_hIQ-vCwBRD2q7AFEPyFsAUQgqL_EhC36v4SENWIsAUQ6-j-EhDG3LAFEKiasAUQ192wBRD9uP0SEN6I_xIQjtqwBRDM364FEMn5sAUQ3ej-EhCwnf8SEKjgsAUQp_KwBRCg5bAFKhRDQU1TQ3hVQW9MMndETkhrQmgwSA%3D%3D",
      coldConfigData:
        "CI6a77IGGjJBT2pGb3gyYXFvcFI3QTIxMVM4bzdjSmNPaVFBek84Vkt2c2FjS2ZVRGZxQU1hZ1JnUSIyQU9qRm94MmFxb3BSN0EyMTFTOG83Y0pjT2lRQXpPOFZLdnNhY0tmVURmcUFNYWdSZ1E%3D",
      coldHashData:
        "CMqx77IGEhQxMzg5MjIzOTgzMTU4MjQ5NTY1MRieoe-yBjIyQU9qRm94MmFxb3BSN0EyMTFTOG83Y0pjT2lRQXpPOFZLdnNhY0tmVURmcUFNYWdSZ1E6MkFPakZveDJhcW9wUjdBMjExUzhvN2NKY09pUUF6TzhWS3ZzYWNLZlVEZnFBTWFnUmdRQjhDQU1TSlEwSXlLS29BczZaQm93TW5nemVGTTBORlJXZzJOME0wX0RTQ19PUEJxaC1tcnNHX2xrPQ%3D%3D",
      hotHashData:
        "CMqx77IGEhM4MjI0ODA0MTAyMTEyMTExNDQwGJ6h77IGKJTk_BIo25P9Eiiekf4SKMjK_hIoqOH-EiiygP8SKMCD_xIo35f_Eij6mP8SKLCd_xIo_qP_EijAqv8SKPur_xIos6z_EijLrf8SKMiu_xIo9a7_EiiWsf8SKPex_xIyMkFPakZveDJhcW9wUjdBMjExUzhvN2NKY09pUUF6TzhWS3ZzYWNLZlVEZnFBTWFnUmdROjJBT2pGb3gyYXFvcFI3QTIxMVM4bzdjSmNPaVFBek84Vkt2c2FjS2ZVRGZxQU1hZ1JnUUIgQ0FNU0V3MEEySV81RmVpS0JoVVBqZUxOREphRDRncz0%3D",
    },
    browserName: "Firefox",
    browserVersion: "115.0",
    acceptHeader:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    deviceExperimentId:
      "ChxOek0zTlRjeE5ESTNOVFV5T1RjNE9UUXpNQT09EI6a77IGGI6a77IG",
    screenWidthPoints: 909,
    screenHeightPoints: 972,
    screenPixelDensity: 1,
    screenDensityFloat: 1,
    utcOffsetMinutes: 420,
    userInterfaceTheme: "USER_INTERFACE_THEME_LIGHT",
    timeZone: "Asia/Jakarta",
    musicAppInfo: {
      pwaInstallabilityStatus: "PWA_INSTALLABILITY_STATUS_UNKNOWN",
      webDisplayMode: "WEB_DISPLAY_MODE_BROWSER",
      storeDigitalGoodsApiSupportStatus: {
        playStoreDigitalGoodsApiSupportStatus:
          "DIGITAL_GOODS_API_SUPPORT_STATUS_UNSUPPORTED",
      },
    },
  },
  user: { lockedSafetyMode: false },
  request: {
    useSsl: true,
    internalExperimentFlags: [],
    consistencyTokenJars: [],
  },
  clickTracking: {
    clickTrackingParams: "CAUQtSwYACITCJOL6q3ku4YDFfiySwUdF9AATQ==",
  },
};
