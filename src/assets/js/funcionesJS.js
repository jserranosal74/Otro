function CompartirEnFacebook(url) {
    FB.ui({
        display: 'popup',
        method: 'share',
        href: url
    }, function(response){
        if (response && !response.error_message) {
            console.log('Posting completed.');
            return 1;
          } else {
            console.log('Error while posting.');
            return 0;
          }
    });
}