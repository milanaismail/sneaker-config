POST /orders
de kleur van de veters, tot de maat van de schoen
Vergeet de contactgegevens van je klant niet te bewaren

DELETE /orders/{id}
Verwijdert een schoen/bestelling
Enkel admins kunnen dit (authenticatie is hier nodig)

PUT/PATCH (zoek op!) /orders/{id}
Update de status van een bestelling
In productie / verzonden / …
Enkel admins kunnen dit

GET /orders/{id}
Haalt details op voor één specifieke schoen
Deze route kan je gebruiken om bijvoorbeeld details van 1 schoen te tonen (vb delen van je schoen op social media)

GET /orders
Haalt alle bestellingen op
Hier kan je eventuele parameters meegeven
?sortby=votes|date

/users
Nu je de basisroutes kent voor het gedeelte dat met de bestellingen te maken heeft, kan je zelf nadenken over welke routes nodig zijn om je gebruik te laten aanloggen, uitloggen, wachtwoord updaten, …
