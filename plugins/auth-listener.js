if(process.client) {
    window.addEventListener('storage', function(event){
        if (event.key == 'auth-event') { 
            location.reload()
        }
    });
}