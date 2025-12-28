export const useConverter = () => {
  const base64 = (element: HTMLInputElement): Promise<any> => {
    const data = (element as any).files[0]

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(data)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const fileToBase64 = (filename: any, filepath: any) => {
    return new Promise((resolve) => {
      var file = new File([filename], filepath)
      var reader = new FileReader()
      // Read file content on file loaded event
      reader.onload = function(event) {
        // @ts-ignore
        resolve(event.target.result)
      }

      // Convert data to base64
      reader.readAsDataURL(file)
    })
  }

  return { base64, fileToBase64 }
}
