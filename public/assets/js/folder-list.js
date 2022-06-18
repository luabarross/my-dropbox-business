
const primary = '/Teste';
const token = 'sl.BJw8EBtfCY5JZaFedbPDTfWLzneKKPcgnzNsF_Su1r4BySS5EkGiOK2WGSrfmkYLK27J1ZJsvT5dvaqvkXslSBMJaKCtsUVT3yGJojWMEIO94HHfDiMXqxJKF6fTJnjH6Fuim2NCszm2KEH-ymk';

const path = '/' === window.location.pathname ? primary : window.location.pathname;

const body = {
    "path": path
};

const img = [];
img['folder'] = '📁 ';
img['file'] = '📄 ';

const start = async function() {
    
    const response = await fetch( "https://api.dropboxapi.com/2/files/list_folder", {
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

        var table = document.querySelector( "#list tbody" );

        if ( data.entries && 0 < data.entries.length ) {
        
            data.entries.forEach( item => {

                document.getElementById( "loading" ).style.display = "none";

                if ( ! item.path_lower ) return;

                let size_val = item.size ? formatFileSize( item.size ) : "—";
                let date = new Date( item.server_modified );
                let modified_val = item.server_modified ? dateFormat( date, 'dd/mm/yyyy, h:MM:ss TT' ) : "—";
                
                let tr = document.createElement( "tr" );
                let name = document.createElement( "td" );
                let size = document.createElement( "td" );
                let modified = document.createElement( "td" );
                let name_a = document.createElement( "a" );
                let size_tx = document.createTextNode( size_val );
                let modified_tx = document.createTextNode( modified_val );
                let tag = Object.entries( item )[0][1];
                let tx = document.createTextNode( img[tag] + item.name );

                name_a.appendChild( tx );
                name_a.setAttribute( 'href', item.path_display );
                name.appendChild( name_a );

                size.appendChild( size_tx );
                size.setAttribute( 'class', "white" );

                modified.appendChild( modified_tx );
                modified.setAttribute( 'class', "white modified" );

                tr.appendChild( name );
                tr.appendChild( size );
                tr.appendChild( modified );

                table.appendChild( tr );
            });

            var path_split = path.split('/');

            if ( path_split && 2 < path_split.length ) {

                var href = '';

                for ( let index = 1; index < path_split.length; index++ ) {

                    const element = path_split[index];
                    href += "/" + element;
                    let bread = document.createElement( "a" );
                    let bread_tx = document.createTextNode( " /" + element );
                    bread.appendChild( bread_tx );
                    bread.setAttribute( 'href', primary === "/" + element ? '/' : href );
                    document.querySelector( "#summary" ).appendChild( bread );
                }
            }

        } else {

            document.querySelector( "#loading td" ).innerHTML = 'não há arquivos ou pastas aqui';
        }
    });
}

start();
