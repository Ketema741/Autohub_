import React, { Component } from "react";

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dirocp1ht",
        uploadPreset: "iynlui3b",
        sources: ["local", "url"],
        maxFileSize: 5000000,
        maxFiles: 1,
        resourceType: "raw",
        acceptedFormats: ["pdf"],
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          this.props.handleUploadComplete(result.info);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <button id="upload_widget" className="cloudinary-button">
        Upload PDF
      </button>
    );
  }
}

export default CloudinaryUploadWidget;
