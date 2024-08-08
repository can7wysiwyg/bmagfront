export const logoutAdmin = () => {
    localStorage.removeItem("bmagtoken")
    

    
    window.location.href="/"
}