function sha256(texto) { 
    const hash = CryptoJS.SHA256(texto); 
    return hash.toString(CryptoJS.enc.Hex); 
}


export {
    sha256
}