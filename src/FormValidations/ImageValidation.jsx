export default function ImageValidation(e) {
  if (e.target.files.length === 0) {
    return "Please Upload an Images"

  }
  else if (e.target.files.length === 1) {
    let file = e.target.files[0]
    if (!(["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type)))
      return "Invalid Pic Type , Please Uploade a pic of type .jpg , .png, .jpeg,.gif , .webp"
    else if (file.size > 1048576)
      return "Pic is to Heavy , please Uploade an Image Upto 1 mb "
    else
      return ""
  }
  else {
    let errorMessage = []
    let files = Array.from(e.target.files)
    files.forEach((x, index) => {
      if (!(["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp"].includes(x.type)))
        errorMessage.push(`Invalid Pic${index+1} Type , Please Uploade a pic of type .jpg , .png, .jpeg,.gif , .webp`)
      else if (x.size > 1048576)
        errorMessage.push(`Pic${index+1} is to Heavy , please Uploade an Image Upto 1 mb`)
      else
        return ""

    })
    return errorMessage.length===0?"":errorMessage.join("|")
  }
}