export class Application{

    constructor(bibliotekeFetch){
        this.biblioteke= bibliotekeFetch;
        console.log(this.biblioteke);
    }

    draw(container){
        let divForma = document.createElement("div");
        divForma.classList.add("divForma");
        this.drawForma(divForma);
        container.appendChild(divForma);

        // let divPolice= document.createElement("div");
        // divPolice.classList.add("divPolice");
        // //this.drawPolice(divPolice);
        // container.appendChild(divPolice);
    }

    drawForma(container)
    {
        this.biblioteke.forEach(p => {

            let divBiblioteka = document.createElement("div");
            divBiblioteka.classList.add("divBiblioteka");
            container.appendChild(divBiblioteka);

            let naslov= document.createElement("h3");
            naslov.innerHTML=p.naziv;
            divBiblioteka.appendChild(naslov);

            let divWrapper = document.createElement("div");
            divWrapper.classList.add("bibliotekaWrapper");
            divBiblioteka.appendChild(divWrapper);

    
            let divFormaLevo = document.createElement("div");
            divFormaLevo.classList.add("bibliotekaLevo");
            divWrapper.appendChild(divFormaLevo);

   
            let divDesno = document.createElement("div");
            divDesno.classList.add("bibliotekaDesno");
            divWrapper.appendChild(divDesno);


           
            p.police.forEach(polica => {
                let label = document.createElement("label");

                let radio = document.createElement("input");
                radio.type = "radio";
                radio.name = `radioOznaka-${p.naziv}`;
                radio.value = polica.oznaka;

                label.appendChild(radio);
                label.append(" " + polica.oznaka);
                divFormaLevo.appendChild(label);

                divFormaLevo.appendChild(document.createElement("br"));
            });

            divFormaLevo.appendChild(document.createElement("br"));

            let labelBrojKnjiga= document.createElement("label");
            labelBrojKnjiga.innerHTML="Broj knjiga";
            divFormaLevo.appendChild(labelBrojKnjiga);

            divFormaLevo.appendChild(document.createElement("br"));

            const input = document.createElement("input");
            input.classList.add("kolicinaInput")
            input.type = "number";   
            // input.id = "brojKnjiga";
            // input.name = "brojKnjiga";
            input.min = 0;           
            input.max = 100;         
            input.value = 0;         
            input.step = 1;     
            input.style.width = "100%";
            divFormaLevo.appendChild(input);

            
            divFormaLevo.appendChild(document.createElement("br"));
            divFormaLevo.appendChild(document.createElement("br"));

            let btnDodaj= document.createElement("input");
            btnDodaj.type="button";
            btnDodaj.value="Dodaj na policu";
            btnDodaj.onclick= ()=>this.dodajKnjigu(p,divBiblioteka);
            divFormaLevo.appendChild(btnDodaj);

            
            
            p.police.forEach(policaa => {

                let policaWrapper = document.createElement("div");
                policaWrapper.classList.add("policaWrapper");

                // levi deo (oznaka)
                let policaLevi = document.createElement("div");
                policaLevi.classList.add("policaLevi");
                policaLevi.innerHTML = policaa.oznaka;
                policaWrapper.appendChild(policaLevi);

                // srednji deo - kockice
                let policaDiv = document.createElement("div");
                policaDiv.classList.add("policaPrikaz");

                // kreiramo kockice proporcionalno maksimalnom broju knjiga
                for (let i = 0; i < policaa.maksimalnoKnjiga; i++) {
                    let knjigaDiv = document.createElement("div");
                    knjigaDiv.classList.add("knjigaSlot");

                    if (i < policaa.trenutnoKnjiga)
                        knjigaDiv.classList.add("popunjeno");
                    else
                        knjigaDiv.classList.add("prazno");

                    policaDiv.appendChild(knjigaDiv);
                }

                policaWrapper.appendChild(policaDiv);


                // desni deo (tekstualni broj)
                let policaDesni = document.createElement("div");
                policaDesni.classList.add("policaDesni");
                policaDesni.innerHTML = `${policaa.trenutnoKnjiga}/${policaa.maksimalnoKnjiga}`;
                policaWrapper.appendChild(policaDesni);

                divDesno.appendChild(policaWrapper);
            });
        

        });    


    }

    dodajKnjigu(biblioteka,divBiblioteka){
        const radio = divBiblioteka.querySelector('input[type="radio"]:checked');
        const kolicina = divBiblioteka.querySelector(".kolicinaInput").value;

        const oznaka= radio.value;
        const idBiblioteke = biblioteka.id;
        console.log(idBiblioteke);
        console.log(kolicina);
        console.log(radio.value);


        fetch(`https://localhost:7080/Ispit/DodajKnjigu/${idBiblioteke}/${oznaka}/${kolicina}`, {
            method: 'PUT'
        }).then(async response => {
            const text = await response.text(); // pročitaj odgovor kao tekst

            if (!response.ok) {
                throw new Error(text); 
            }

            alert(text); 
            console.log('Successfully updated:', text);

            window.location.reload();
        }).catch(error => {
            alert("Greška: " + error.message);
            console.error('Error during PUT request:', error.message);
        });

    }
}