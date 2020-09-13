const uploadImg = document.querySelector(".upload-img");
const FileInput = document.querySelector(".input-img");

uploadImg.addEventListener("click", function(e) {
    // stops default behaviour os anchor
    e.preventDefault();
    FileInput.click();
});

FileInput.addEventListener("change",function(e)
{
    const writingPad = createBox();
    const img = document.createElement("img");

    // we called createObjectURL on the selected file object file to create the URL that we can set as the value of the src attribute.
    let src = URL.createObjectURL(e.target.files[0]);

    img.src = src;
    img.setAttribute("class", "uploadedImgStyle");
    writingPad.appendChild(img);
    
    // when the image is loaded, we call revokeObjectURL to clear the resources for creating the URL.
    img.onload = function() {
        URL.revokeObjectURL(img.src);
    };
});

const downloadTool = document.querySelector(".download-tool");
downloadTool.addEventListener("click", function(e) {
    const a=document.createElement("a");
    // set name of file
    a.download=`${Date.now()}.png`;
    
    a.href=board.toDataURL("image/png");
    a.click();
    a.remove();
});