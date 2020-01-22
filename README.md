# Zorgcowboys

<img src="https://github.com/sarkis1997/sarkis1997.GITHUB.IO/blob/master/media/scrhome.png">

## Doel van de app
Bij 97 grote zorgbedrijven is in 2017 voor ruim vijftig miljoen euro aan winst gemaakt. Dat komt
neer op ruim twintig procent van de omzet, terwijl hooguit drie procent gangbaar is binnen
de geestelijke gezondheidszorg, gehandicaptenzorg, en thuiszorg. Mogelijk zijn deze winsten
onrechtmatig tot stand gekomen. De jaarrekeningen van deze instellingen worden zelden
gecontroleerd, waardoor aandeelhouders voor miljoenen euro’s aan zorggeld aan zichzelf kunnen
uitkeren.

Met deze datavisualisatie willen wij de zorgsectoren die vermoedelijk frauderen in kaart brengen.

## Functies
* Wisselen per jaar
* Wisselen tussen alle zorgsectoren en weergave per zorgsector (IN ONTWIKKELING)
* Live zoekfunctie
* Weergave aantal zorginstellingen per jaar
* Hover per zorgintelling
* Klik per zorginstelling (IN ONTWIKKELING)
* Klikbare legenda filter
* Range Slider

## Bugs
* Wisselen naar 'per zorgsector' weergave werkt nog niet
* Deep Dive (klikken op zorginstellingen) heeft nog geen datavisualisatie
* Mobiele versie is niet beschikaar

## Opzet project
De applicatie is gebouwd zonder framework met html, css en js, maar heeft wel iets weg van een framework.<br>
De structuur is opgedeeld zoals de meeste frameworks. De basis van het project is opgedeeld als volgt: 

* index.html
* js
* css

De map js bestaat uit:
* app.js
* modules map
* utils map

App.js wordt aangeroepen in index.html, waarop vervolgens app.js verschillende utils en modules gebruikt om de app te draaien.

Het project is afhankelijk van 1 library, <a href="https://github.com/RasmusFonseca/d3RangeSlider/blob/master/d3RangeSlider.js">d3RangeSlider.js</a>


## Installatie
1. Run de command line
2. `git clone https://github.com/sarkis1997/sarkis1997.GITHUB.IO/`
3. Open het project en sleep index.html naar je browser

## Data
De dataset is een json bestand en afkomstig van Pointer van KRO-NCRV.<br>
Het bestand bevat voornamelijk financiële informatie over zorginstellingen in Nederland van de periode 2011 t/m 2018.

In deze applicatie wordt de volgende specifieke data gebruikt:
* Naam zorginstelling
* Winst
* Omzet
* Winstpercentage
* Jaar

## Data opschoning
Zoals gewoonlijk, kan je niet klakkeloos uitgaan dat een dataset helemaal correct is.<br>
Tijdens het exploreren zijn we erachter gekomen dat sommige data niet klopt.<br>
Nadat de data wordt ingelezen, wordt iedere zorginstelling gecheckt op winst, omzet en winstpercentage.<br>
Wij hebben voor de winst een maximum grens gesteld van 80%.<br>
Voor de omzet hebben wij een minimum grens gesteld van €0,-, omdat het niet logisch is om een negatief omzetresultaat te behalen.<br>
De winstpercentage, winst en omzet worden ook nog eens gecheckt op de waardes wel of geen nummer zijn.<br>
Bij een van bovenstaande opsporingen wordt de zorginstelling uit de dataset verwijderd.

## License
<a href="https://github.com/sarkis1997/sarkis1997.GITHUB.IO/blob/master/LICENSE">MIT</a> @ Sarkis Moeradjan