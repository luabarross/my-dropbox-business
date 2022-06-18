const path = decodeURI( window.location.pathname );
const body = {
    "path": path
};

const start = async function() {
    
    const response = await fetch( "https://api.dropboxapi.com/2/files/get_temporary_link", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Dropbox-API-Select-User': 'dbmid:AAC56KaXDi-i7Uo_Cz7E_hTfXnlpgY-qCH4'
        },
        body: JSON.stringify( body ),
    });

    response.json().then( data => {

        if ( data.link && 0 < data.link.length ) {

            let btn_voltar = document.createElement( "img" );
            btn_voltar.setAttribute( 'src', '/assets/img/previous.png' );
            btn_voltar.setAttribute( 'onclick', 'history.back()' );
            document.querySelector("header").appendChild( btn_voltar );
            document.querySelector("header").appendChild( document.createTextNode( data.metadata.name ) );
        
            if ( data.metadata.name.includes('.mp4') ) {

                document.querySelector( "#file" ).innerHTML = `
                    <video width="100%" controls>
                        <source src="${data.link}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                `;
            } else {

                document.querySelector( "#file" ).innerHTML = "<img src='"+data.link+"' />";
            }

        } else {

            document.querySelector( "#file" ).innerHTML = 'não há arquivos ou pastas aqui';
        }
    });
}

start();
