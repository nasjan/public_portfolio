---
title: "Mestarihiiren keittiö"
subtitle: "Henkilökohtainen resepti- ja kauppalista-apuri"
status: "Työn alla"
role: "Tuotekonsepti, UX/UI-suunnittelu, frontend-toteutus"
timeline: "Kesäkuu 2026 alkaen (työn alla)"
tools: "React, TypeScript, Vite, Firebase Authentication, Cloud Firestore, PWA, Vitest, Figma, lucide-react"
---

# Mestarihiiren keittiö

> **Työn alla:** Tämä case kuvaa käynnissä olevaa vapaa-ajan projektia. Käyttöliittymä, ominaisuudet ja tekniset ratkaisut kehittyvät edelleen.

## Tiivistelmä

Mestarihiiren keittiö on henkilökohtainen resepti- ja kauppalista-apuri, joka syntyi hyvin konkreettisesta arjen ongelmasta: kumppanillani ei ollut helppoa paikkaa omille resepteille eikä työkalua, jolla reseptin annosmäärää voisi muuttaa ilman käsin laskemista.

Sovelluksessa käyttäjä voi tallentaa reseptejä, valita halutun annosmäärän ja saada ainesosat automaattisesti skaalattuina. Yhden tai useamman reseptin ainekset voi lisätä kauppalistalle, jossa ne ryhmitellään ja voidaan jakaa tai kopioida selkeänä tekstinä esimerkiksi viestisovellukseen tai muistiinpanoihin.

Projektin tavoitteena ei ole rakentaa yleistä meal planning -palvelua. Se on tarkoituksella pieni, henkilökohtainen ja mobiilipainotteinen työkalu yhdelle käyttäjälle.

---

## Vaikutus

Ensisijainen käyttäjä sai yhden paikan resepteilleen, pystyy muuttamaan annosmääriä ilman käsin laskemista ja voi lähettää kauppalistan selkeänä tekstinä kuvakaappausten sijaan. Sovellus on ollut hyödyllinen jo varhaisesta versiosta lähtien, mutta sitä kehitetään jatkuvasti arjen käytössä havaittujen kitkakohtien perusteella.

---

## Projektin tiedot

| | |
| --- | --- |
| **Rooli** | Tuotekonsepti, UX/UI-suunnittelu, frontend-toteutus |
| **Käyttäjä** | Yksi ensisijainen käyttäjä, joka turhautuu helposti huonoihin palveluihin |
| **Alusta** | Mobiilipainotteinen selainpohjainen sovellus |
| **Teknologiat** | React, TypeScript, Vite, Firebase Authentication, Cloud Firestore, Figma |
| **Tila** | Työn alla |
| **Oma panos** | Konsepti, informaatioarkkitehtuuri, käyttövirrat, visuaalinen suunta, komponentit ja toteutuksen ohjaus |

> **Täydennä ennen julkaisua:** linkki live-versioon ja mahdollinen repository-linkki.

---

## Ongelma

Reseptit ovat usein hajallaan verkkosivuilla, kuvakaappauksissa, keskusteluissa ja muistiinpanoissa. Kun sama ruoka halutaan tehdä eri annosmäärälle, ainesosat pitää laskea käsin. Kauppalista syntyy helposti kuvakaappauksina tai vapaana tekstinä, jota toisen henkilön on hankala käyttää kaupassa.

Alkuperäinen tarve tuli kumppaniltani:

- resepteille tarvittiin oma, helposti käytettävä säilytyspaikka
- annosmäärää piti voida muuttaa nopeasti esimerkiksi kahdelle, neljälle tai kahdeksalle
- ainesosista piti saada selkeä kauppalista ilman käsin kirjoittamista
- kauppalista piti voida lähettää minulle helposti tekstinä, ei kuvakaappauksena

### Ongelman määrittely

> Miten henkilökohtaisista resepteistä voidaan tehdä nopeasti käytettäviä eri annosmäärille ja muuntaa niiden ainekset selkeäksi, jaettavaksi kauppalistaksi ilman, että käyttäjän täytyy laskea määriä tai muotoilla listoja käsin?

---

## Tavoite ja rajaus

### Tavoite

Suunnitella rauhallinen, selkeä ja mobiilissa toimiva reseptimuistio, joka tekee kolme asiaa hyvin:

1. tallentaa reseptin ymmärrettävässä muodossa
2. skaalaa ainesosat halutulle annosmäärälle
3. muodostaa kauppalistan, jonka voi jakaa tai kopioida sellaisenaan

### Mitä en yrittänyt ratkaista

- en rakentanut monikäyttäjäpalvelua tai sosiaalista reseptiyhteisöä
- en lisännyt ravintosisältölaskentaa, viikkosuunnittelua tai maksullisia premium-ominaisuuksia
- en käyttänyt kielimallia annoslaskennan tai kauppalistan yhdistelyn ydintoimintoon
- en yrittänyt tehdä sovelluksesta yleistä reseptisivustoa tai ruokaostospalvelua

Rajaus piti tuotteen tarkoituksella pienenä: henkilökohtainen apuri, ei keittiön hallintajärjestelmä.

---

## Käyttäjä ja käyttötilanne

Ensisijaisella käyttäjällä on lyhyt pinna. Siksi käyttöliittymässä korostuvat:

- yksi selkeä ensisijainen toiminto per näkymä
- suuret kosketuskohteet
- selkokieliset painiketekstit
- mahdollisimman vähän asetuksia ja päätöksiä
- näkyvä palaute tallennuksesta, lisäyksestä ja poistosta
- mobiilikäyttö, jossa lista pitää pystyä silmäilemään nopeasti kaupassa

Sovellusta käytetään erityisesti kolmessa tilanteessa:

1. **Reseptiä lisätessä:** käyttäjä kopioi ainesosia reseptisivulta tai lisää niitä yksittäin.
2. **Ruokaa suunnitellessa:** käyttäjä valitsee reseptin ja muuttaa annosmäärää.
3. **Kaupassa tai listaa lähettäessä:** käyttäjä merkitsee tuotteita ostetuiksi ja jakaa listan selkeänä tekstinä.

---

## Käyttäjätestaus ja jatkuva iterointi

Sovellus ratkaisi ensisijaisen käyttäjän alkuperäisen ongelman jo varhaisessa vaiheessa: resepteille syntyi oma paikka, annosmäärien laskeminen nopeutui ja kauppalistan pystyi lähettämään selkeänä tekstinä kuvakaappauksen sijaan. Se ei kuitenkaan ollut testauksen päätepiste.

Käytän sovellusta jatkuvan, kevyen käyttäjätestauksen kohteena ensisijaisen käyttäjän kanssa. Tavoite ei ole kerätä muodollista tutkimusaineistoa, vaan havaita arjen käytössä kohdat, joissa käyttö hidastuu, käyttäjä epäröi tai käyttöliittymä tuntuu liian raskaalta. Muutokset tehdään havaittuihin käyttötilanteisiin, ei vain visuaalisen mieltymyksen perusteella.

### Käyttäjätestauksesta syntyneitä muutoksia

- **Ostetuksi merkityt tuotteet listan loppuun:** Kauppalistalla ostetut tuotteet voidaan pudottaa alemmas, jotta jäljellä olevat ostokset ovat nopeasti silmäiltävissä.
- **Uusi resepti alanavigaatioon:** Reseptin lisääminen nostettiin omaksi ensimmäiseksi navigaatiokohdakseen, jotta yleinen tehtävä löytyy ilman erillistä painiketta reseptikirjastosta.
- **Reseptin nimi ja kategoria lomakkeelle, pois modaalista:** Sekä reseptin nimi että valinnainen kategoria siirrettiin tallennusmodaalista reseptilomakkeen loppuun. Nyt kaikki reseptin tiedot näkyvät samassa paikassa, tallennus tapahtuu yhdellä painalluksella ilman erillistä dialogia, ja kenttä toimii yhtä lailla muokkausnäkymässä. Nimi pidetään aluksi tyhjänä, jottei käyttäjän tarvitse keksiä sitä ennen kuin resepti on koossa. Jos käyttäjä tallentaa ilman nimeä, virhe näytetään suoraan nimikentän alla ja fokus siirtyy kenttään, ei erilliseen dialogiin.
- **Reseptien ryhmittely kategorioittain:** Reseptilistalla reseptit ryhmitellään käyttäjän antamien kategorioiden mukaan (esim. pääruoka tai välipala), mikä helpottaa navigointia kirjaston kasvaessa. Tyhjästä näkymästä ryhmäotsikot jätetään pois.
- **Ainesosien lisäys kahdeksi selkeäksi vaihtoehdoksi:** Käyttäjä valitsee ensin joko `Liitä ainekset kerralla` tai `Lisää yksittäin`. Vaihtoehdot avautuvat progressiivisesti saman painikkeen alle, ja vain yksi on auki kerrallaan. Tämä korvasi pitkän, jatkuvasti kasvavan lomakerivilistan.
- **Palaute ei saa siirtää sivun sisältöä:** Lisäys- ja poistoilmoitukset näytetään kelluvina ilmoituksina, jotka eivät työnnä lomakkeen muita elementtejä. Yksittäisen ainesosan poiston voi perua väliaikaisesta snackbarista, joka ei vie fokusta käyttäjältä.
- **Kauppalistan ja reseptin lukutapa:** Määrä ja ainesosa erotettiin omiin sarakkeisiinsa, jotta listaa voi silmäillä nopeasti reseptiä tehdessä ja kaupassa.
- **Logo vie aina reseptilistalle:** Headerin maskottilogosta tuli painike, joka palauttaa käyttäjän reseptikirjastoon mistä tahansa näkymästä. Logo on totuttu kotipainike, ja sen tekeminen toimivaksi vähensi tilanteita, joissa käyttäjä jäi näkymään ilman selkeää paluureittiä.

### Mitä testaus ei vielä kerro

Kyse on yhden ensisijaisen käyttäjän jatkuvasta käytettävyystestauksesta, ei laajasta käyttäjätutkimuksesta. Se kertoo hyvin, ratkaiseeko tuote alkuperäisen arjen ongelman ja toimiiko se kyseiselle käyttäjälle, mutta ei vielä osoita, että ratkaisu toimisi yhtä hyvin kaikille. Ennen laajempaa julkaisua sovellus pitäisi testata myös muilla käyttäjillä, erityisesti reseptien lisäyksen, mobiilikäytön ja varmuuskopioinnin osalta.

---

## Ratkaisu

Mestarihiiren keittiö yhdistää reseptikirjaston, annoslaskurin ja kauppalistan yhteen kevyeen käyttövirtaan.

### Keskeiset ominaisuudet

- reseptien tallennus henkilökohtaisen käyttäjätilin alle ja reaaliaikainen synkronointi laitteiden välillä
- reseptin perusannosmäärä ja annosmäärän säätäminen
- ainesosien deterministinen skaalaus
- ainesosaluettelon liittäminen vapaasta tekstistä ja sen jäsentäminen rakenteiseksi malliksi
- valinnainen tekoälyapuri ainesluettelon siistimiseen ulkoisen kielimallin kautta
- yksittäisten ainesosien lisääminen, muokkaaminen ja poistaminen
- reseptien luokittelu valinnaisilla kategorioilla ja kategoriapohjainen ryhmittely listalla
- kauppalistan muodostaminen resepteistä ja samojen ainesten yhdistäminen yhteismitallisiksi määriksi
- kauppalistan ryhmittely kaupan osastoihin
- ostosten merkitseminen tehdyiksi ja niiden siirtyminen listan loppuun
- listan jakaminen laitteen jakovalikolla tai kopiointi leikepöydälle
- reseptin ja koko reseptikirjaston varmuuskopiointiin tähtäävät jakamis- ja vientitoiminnot
- offline-käyttö ja asennettavuus aloitusnäytölle (PWA)
- jokaisen päänäkymän sisäiset, ajantasaiset ohjeet

### Päänäkymät

1. **Uusi resepti**
   - käyttäjä valitsee perusannokset
   - lisää ainekset kerralla tai yksittäin
   - kirjoittaa ohjeet ja omat huomiot
   - antaa reseptin nimen ja valinnaisen kategorian lomakkeen lopussa
   - näkymä avautuu sivuna alanavigaatiosta, ei modaalina

2. **Reseptit**
   - henkilökohtainen reseptikirjasto, ryhmiteltynä kategorioittain
   - haku, kun reseptejä on paljon
   - reseptin avaaminen, muokkaaminen ja varmuuskopiointi

3. **Reseptin näkymä**
   - avattu resepti, jossa annosmäärää säädetään ja ainesosat skaalautuvat välittömästi
   - reseptin lisääminen kauppalistaan valitulla annosmäärällä
   - reseptin muokkaus, kahdennus, jakaminen ja poisto

4. **Kauppalista**
   - resepteistä muodostettu, ryhmitelty ostoslista
   - valittavat ostosrivit
   - jakaminen ja kopiointi selkeänä plain text -muotoisena listana

---

## Keskeiset suunnittelupäätökset

### 1. Annoslaskenta on deterministinen, ei tekoälypohjainen

Annosmäärän skaalaus ja kauppalistan yhdistely ovat tehtäviä, joissa käyttäjän pitää pystyä luottamaan lopputulokseen. Siksi laskenta perustuu sääntöihin:

```text
skaalauskerroin = halutut annokset / reseptin perusannokset
```

Esimerkiksi 300 g neljälle annokselle muuttuu 150 grammaksi kahdelle annokselle.

Sama deterministinen periaate koskee myös kauppalistaa: kun samaa ainesosaa tulee useammasta reseptistä, määrät yhdistetään muuntamalla ne ensin yhteismitalliseen perusyksikköön (esimerkiksi kilot grammoiksi ja litrat millilitroiksi) ja näytetään käyttäjälle takaisin selkeimmässä yksikössä. Tekoäly voi auttaa reseptin tekstin siistimisessä, mutta se ei ole laskennan tai yhdistelyn lähde.

### 2. Määrät säilytetään laskettavina myös murtolukuina ja väleinä

Reseptit sisältävät usein määriä kuten `¼ tl`, `1½ rkl`, `1–2 rkl` tai `ripaus`. Pelkkä desimaaliluku ei riitä, jos arvoja halutaan skaalata luotettavasti ja näyttää keittiössä ymmärrettävässä muodossa.

Siksi määrämallissa erotetaan:

- tarkka määrä, esimerkiksi `¼` tai `1½`
- määräväli, esimerkiksi `1–2`
- sanallinen määrä, esimerkiksi `ripaus` tai `maun mukaan`

Numeeriset arvot voidaan käsitellä rationaalilukuina, jolloin laskenta ei kärsi liukulukujen epätarkkuudesta. Näyttömuoto on yksikkökohtainen: esimerkiksi teelusikat voidaan näyttää murtolukuina, mutta kilogrammat suomalaisina desimaaleina.

### 3. Käyttäjä valitsee ensin tavan lisätä ainekset

Ainesosien lisäys erotettiin kahteen selkeään toimintoon:

- **Liitä ainekset kerralla**
- **Lisää yksittäin**

Tämä vähentää epäselvyyttä. Käyttäjän ei tarvitse ensin nähdä suurta lomaketta ja päätellä, miten sitä käytetään. Vain yksi lisäystapa avautuu kerrallaan, ja lisätyt ainekset siirtyvät omaan listaan.

### 4. Ainesosalista erotetaan syöttölomakkeesta

Aiempi ratkaisu, jossa jokainen lisätty ainesosa jäi avoimeksi lomakekortiksi, teki sivusta pitkän ja vaikeasti silmäiltävän. Uudessa mallissa käyttäjä lisää yhden ainesosan kerrallaan, saa vahvistuksen ja näkee tuloksen selkeässä listassa.

Listassa määrä ja ainesosa erotetaan omiin sarakkeisiin. Tämä helpottaa nopeaa lukemista reseptiä tehdessä ja kaupassa.

### 5. Kauppalista on jaettava tekstinä, ei kuvana

Kauppalistan arvo syntyy vasta, kun sen voi käyttää muuallakin. Sovellus muodostaa samasta listasta yhden johdonmukaisen plain text -version, jota voidaan:

- jakaa laitteen natiivilla jakovalikolla
- lähettää WhatsAppiin tai vastaavaan viestisovellukseen
- tallentaa Google Keepiin, Apple Notesiin tai muuhun muistiinpanoon
- kopioida leikepöydälle

Tämä ratkaisee alkuperäisen ongelman: listaa ei tarvitse lähettää kuvakaappauksena.

### 6. Pitkät lomakkeet ovat näkymiä, pienet tehtävät ovat modaaleja

Uusi resepti ja reseptin muokkaus ovat sovelluksen omia näkymiä, eivät isoja modaaleja. Ne sisältävät pitkää sisältöä, tekstikenttiä ja mobiilin näppäimistön kanssa toimivaa vieritystä. Uusi resepti avautuu alanavigaatiosta tasaisena sivuna; reseptin muokkaus avautuu reseptin kohdalla ja säilyttää modaalin ilmeen, koska se palaa takaisin samaan reseptiin.

Kaikki reseptiin liittyvät tiedot (ainekset, ohjeet, kategoria ja nimi) pidetään samalla lomakkeella, jotta tallennus on yksi selkeä toiminto. Reseptin nimeämistä ei enää kysytä erillisessä modaalissa, vaan nimi on lomakkeen kenttä, jonka validointi näkyy suoraan kentän alla.

Modaaleja käytetään vain rajattuihin, lyhyisiin tehtäviin, kuten:

- yksittäisen ainesosan lisäämiseen tai muokkaamiseen
- reseptin esikatseluun ja ohjeisiin
- poistamisen vahvistamiseen

### 7. Kaikki toiminta selitetään sovelluksen sisällä

Koska ensisijainen käyttäjä turhautuu helposti, sovellus ei oleta opittua. Jokaisella päänäkymällä on oma `Ohjeet`-näkymänsä, joka kuvaa juuri sen näkymän toiminnot käyttäjän omin termein: reseptin lisääminen, selaaminen, muokkaaminen ja hallinta, reseptin lisääminen kauppalistaan sekä kauppalistan logiikka (mistä lista syntyy, miten tuotteet merkitään ja miten lista jaetaan).

Ohjeet pidetään ajan tasalla käyttöliittymän kanssa: tekstit viittaavat täsmälleen samoihin painikkeisiin, jotka näytöllä näkyvät. Tavoite on, että uusi käyttäjä voi lukea ohjeet ja onnistua ilman ulkopuolista neuvontaa, ja että ohjeet ovat keskenään johdonmukaiset.

### 8. Vapaan tekstin jäsentäminen on sääntöpohjaista, tekoäly on valinnainen apuväline

Reseptisivuilta kopioidut ainesluettelot ovat sotkuisia: määrä ja ainesosa voivat olla eri riveillä, mukana on pakkauskokoja kuten `2 prk (à 150 g)`, säilykesanoja (`tlk`, `prk`, `pss`), murtolukuja, välejä (`1–2 rkl`) ja sanallisia määriä (`ripaus`, `maun mukaan`). Sovellus jäsentää tämän omalla sääntöpohjaisella parserilla rakenteiseksi malliksi: se tunnistaa määrän, yksikön, pakkauskoon ja sanalliset määrät, yhdistää erilliset määrä- ja nimirivit ja arvaa ainesosalle kaupan osaston suomenkielisillä avainsanoilla. Parserin toiminta on ennakoitavaa ja testattua, joten käyttäjä voi luottaa siihen ilman verkkoyhteyttä tai ulkoista palvelua.

Tekoäly tuotiin mukaan vasta siihen kohtaan, jossa parseri ei riitä: jos lähdeteksti on poikkeuksellisen sekava, käyttäjä voi painaa **Kopioi ohje tekoälylle**, liittää valmiin ohjeen valitsemaansa kielimalliin ja palauttaa sen siistimän listan takaisin liittämiskenttään. Mallia ei ole integroitu sovellukseen, sille ei lähetetä käyttäjän dataa automaattisesti, eikä se laske määriä. Se vain siistii tekstin, jonka deterministinen parseri lopulta käsittelee. Ohjeessa muistutetaan tarkistamaan tekoälyn tulos ennen lisäämistä.

---

## Käyttöliittymä ja visuaalinen suunta

Visuaalinen tavoite on henkilökohtainen keittiömuistio, ei ruokakaupan kampanjasivu.

Suunnitteluperiaatteet:

- lämmin, vaalea tausta
- vihreä toiminnallisena korostevärinä
- Montserrat käyttöliittymäfonttina
- leipäteksti vähintään 1 rem ja pääosin painolla 400
- kevyt hierarkia, vähän vahvoja kortteja
- selkeät aktiiviset, toissijaiset ja vaaralliset toiminnot
- maskotti toimii pienessä roolissa bränditunnisteena, ei käyttöliittymän hallitsevana elementtinä

> **Lisää tähän myöhemmin:** 2–4 valittua käyttöliittymäkuvaa ja niiden kuvatekstit. Hyviä näyttöjä ovat Uusi resepti, reseptin annosmäärän muutos, kauppalista ja jaettava tekstimuoto.

### Suunnittelujärjestelmä (Figma)

Toteutuksen rinnalle koottiin Figmaan kevyt suunnittelujärjestelmä, joka on johdettu suoraan koodin tyyleistä, jotta suunnittelu ja toteutus pysyvät synkassa:

- **Tokenit:** sovelluksen CSS-muuttujat (värit, välistykset, kulmapyöristykset) vietiin Figma-muuttujiksi, joissa on Dev Mode -koodisyntaksi, sekä Montserrat-tekstityylit ja varjotyylit.
- **Komponentit:** napit, lomakekentät, annosmäärän säädin, listarivit, alanavigaatio, ilmoitukset ja muut toistuvat osat rakennettiin auto-layoutilla ja sidottiin tokeneihin, jolloin yksi muutos päivittyy kaikkialle.
- **Näkymät:** päänäkymät sekä eri tilat ja modaalit (kirjautuminen, tyhjät tilat, ainesosien lisäystavat, esikatselu ja ohjeet) koottiin samoista komponenteista.

Suunnittelujärjestelmä toimii muutostyön nopeana hiekkalaatikkona: käyttöliittymämuutos voidaan kokeilla Figmassa ja viedä sieltä takaisin koodiin.

---

## Saavutettavuus ja käytettävyys

Koska ensisijainen käyttäjä turhautuu epäselviin ja epäjohdonmukaisiin sovelluksiin, saavutettavuus ja ennakoitava vuorovaikutus ovat olleet osa suunnittelua, eivät jälkikäteen lisätty tarkistuslista.

Tavoitteita:

- WCAG 2.2 AA -tasoinen kontrasti ja fokus
- vähintään 44 × 44 px kosketuskohteet
- näkyvät kenttäotsikot, ei pelkkiä placeholder-tekstejä
- näppäimistökäyttö ja järkevä fokuksen hallinta modaaleissa
- `prefers-reduced-motion` huomioiva liike
- ruudunlukijalle välittyvät tila- ja onnistumisviestit
- mahdollisuus perua yksittäisen ainesosan poisto väliaikaisella snackbar-ilmoituksella

> **Täydennä ennen julkaisemista:** mitä automaattisia ja manuaalisia saavutettavuustestejä toteutettiin, millä laitteilla sovellusta testattiin ja mitä korjauksia testaus tuotti.

---

## Tekninen toteutus

Sovellus on rakennettu seuraavalla rakenteella:

- **Frontend:** React + TypeScript + Vite, ikonit lucide-react-kirjastosta
- **Autentikointi:** Firebase Authentication (sähköposti ja salasana)
- **Tietokanta:** Cloud Firestore, käyttäjäkohtainen datahierarkia `users/{uid}/recipes` ja `users/{uid}/shoppingLists/main`
- **Reaaliaikaisuus ja offline:** Firestoren tilausmalli (`onSnapshot`) pitää näkymät ajan tasalla, ja pysyvä paikallinen välimuisti (`persistentLocalCache`) sallii käytön ilman verkkoyhteyttä
- **Asennettavuus:** PWA-manifesti ja kuvakkeet, jolloin sovelluksen voi asentaa puhelimen aloitusnäytölle ja käyttää erillisen sovelluksen tapaan
- **Paikallinen tila:** jos Firebasea ei ole määritetty, sovellus toimii selaimen paikallismuistilla, mikä helpottaa kehitystä ja kokeilua
- **Yhteensopivuus vanhojen reseptien kanssa:** ennen rakenteista määrämallia tallennetut reseptit muunnetaan lukuhetkellä rationaaliluvuiksi, joten vanha ja uusi data käyttäytyvät samalla tavalla

### Tietoturva

Reseptit ja kauppalistat tallennetaan käyttäjäkohtaisesti, ja Firestore Security Rules rajaa luku- ja kirjoitusoikeudet käyttäjän omaan dataan:

- vain kirjautunut, tilin omistava käyttäjä pääsee käsiksi omaan polkuunsa
- anonyymi kirjautuminen on estetty sekä sovelluksessa että säännöissä: tilit luo omistaja, eikä rekisteröitymistä tai vieraskäyttöä ole
- kirjoituksille on kevyet kokorajat (esimerkiksi nimen, ohjeiden ja ainesosalistan enimmäispituudet), jotta yksittäinen tili ei voi tallentaa kohtuuttoman suuria dokumentteja

### Testaus

Laskennan ja jäsentämisen ydinlogiikka on yksikkötestattu Vitestillä: määrien jäsennys ja muotoilu, ainesosatekstin parserointi, reseptien skaalaus ja kauppalistan yhdistely sekä yksiköiden muunnokset. Lisäksi Firestore-säännöille on oma testinsä (`@firebase/rules-unit-testing`), joka varmistaa, ettei käyttäjä pääse toisen dataan. Testit kohdistuvat tarkoituksella siihen logiikkaan, jossa virhe olisi käyttäjälle näkymätön mutta vahingollinen, esimerkiksi väärin skaalattu määrä.

> **Täydennä ennen julkaisemista:** lopullinen julkaisuympäristö (Firebase Hosting) ja kattava saavutettavuus- ja laitetestaus.

---

## Mitä olen oppinut projektista

### Pieni henkilökohtainen ongelma voi olla hyvä tuotehaaste

Projektin lähtökohta oli arkinen, mutta se sisälsi useita aidosti kiinnostavia tuotesuunnittelun kysymyksiä: luotettava laskenta, vapaamuotoisen reseptitekstin jäsentäminen, mobiilin lomakekäyttö, tiedon jakaminen ja henkilön luottamus omaan dataansa.

### Käyttäjävirran selkeys on tärkeämpää kuin ominaisuuksien määrä

Useat käyttöliittymämuutokset syntyivät siitä havainnosta, että käyttäjä joutui tekemään liian monta päätöstä samanaikaisesti. Esimerkiksi ainesosien lisääminen selkeni, kun tuonti ja yksittäinen lisäys erotettiin omiksi, vaihtoehtoisiksi tavoikseen.

Jatkuva käyttö ensisijaisen käyttäjän kanssa osoitti myös, että toimiva ydinidea ei tarkoita valmista käyttökokemusta. Sovellus oli hyödyllinen jo varhain, mutta yksityiskohdat, kuten navigaation järjestys, ostettujen tuotteiden sijoittuminen ja reseptikategorian ajankohta, vaikuttivat siihen, tuntuiko käyttö rauhalliselta vai keskeyttävältä.

### Tekoäly kannattaa rajata kohtaan, jossa se tuo lisäarvoa

Tekoäly on hyödyllinen apu reseptitekstin siistimisessä, ja se toteutettiin tarkoituksella kevyenä, valinnaisena siltana ulkoiseen kielimalliin, ei sovellukseen sidottuna ja dataa lähettävänä integraationa. Se ei ole oikea ratkaisu annosmäärien laskentaan, kauppalistan yhdistelyyn tai käyttäjän datan hallintaan. Luotettavuutta vaativat ydintoiminnot hyötyvät deterministisistä säännöistä, ja juuri siksi sekä jäsentäminen että laskenta tehdään testatulla, sääntöpohjaisella koodilla. Tekoäly hoitaa vain sen osan, jossa sumea teksti pitää siistiä ennen jäsennystä.

---

## Nykytila ja seuraavat askeleet

### Toteutettu tai työn alla

- [x] reseptikirjaston perusrakenne
- [x] annosmäärän säätäminen ja ainesosien skaalaus
- [x] kauppalistan perusrakenne, ainesten yhdistely ja listan jakaminen
- [x] mobiilipainotteinen käyttöliittymä
- [x] käyttäjäkohtainen tallennus Firebaseen ja reaaliaikainen synkronointi
- [x] Firestore-tietoturvasäännöt ja niiden testit
- [x] vapaan tekstin sääntöpohjainen jäsentäminen (parseri) ja sen testit
- [x] valinnainen tekoälysilta ainesluettelon siistimiseen ulkoisella mallilla
- [x] offline-tuki ja asennettava PWA
- [x] paikallinen tila Firebasen puuttuessa ja vanhojen reseptien yhteensopivuusmuunnos
- [x] reseptien kategoriat ja kategoriapohjainen ryhmittely listalla
- [x] reseptin nimeämisen ja kategorian siirto lomakkeelle, modaalin poisto
- [x] jokaisen näkymän sisäiset ohjeet ja niiden ajantasaisuus
- [x] ydinlogiikan yksikkötestit (Vitest)
- [x] Figma-suunnittelujärjestelmä (tokenit, komponentit, näkymät)
- [ ] ainesosien automaattisen ryhmittelyn kattavampi sanasto
- [ ] reseptin koko tekstin tunnistus, mukaan lukien ohjeet
- [ ] kattava saavutettavuus- ja laitetestaus
- [ ] makrojen laskenta ja näkyville asettaminen

### Seuraavat kehitysaskeleet

1. Viimeistellä reseptin lisäyksen käyttövirta ja testata se oikealla käyttäjällä.
2. Koventaa ainesosien ryhmittelyä suomenkielisillä alias- ja tuotekohtaisilla säännöillä.
3. Toteuttaa varmuuskopiointi, jotta henkilökohtainen reseptikirjasto ei jää vain yhden järjestelmän varaan.
4. Arvioida, onko koko reseptin tekoälyavusteinen jäsentäminen tarpeeksi luotettava lisäominaisuudeksi.
5. Tehdä systemaattinen WCAG- ja mobiilikäytettävyysauditointi ennen laajempaa käyttöä.

---

## Portfolioon lisättävät materiaalit

Lisää tähän ennen julkaisemista:

- [ ] linkki live-sovellukseen
- [ ] 3–5 viimeisteltyä käyttöliittymäkuvaa
- [ ] lyhyt video tai GIF: annosmäärän muuttaminen ja kauppalistan muodostus
- [ ] kuva tai kaavio ainesosien lisäyksen ennen/jälkeen -virrasta
- [ ] kuva jaettavasta kauppalistatekstistä WhatsAppissa tai muistiinpanossa
- [ ] lyhyt kuvaus käyttäjätestistä tai palautteesta
- [ ] kuvat Figma-suunnittelujärjestelmästä: tokenit, komponenttikirjasto ja näkymät
- [ ] mahdollinen GitHub-linkki, jos repository on julkinen

---

## Yhden lauseen portfolioesittely

**Mestarihiiren keittiö on mobiilipainotteinen henkilökohtainen resepti- ja kauppalista-apuri, jonka suunnittelin ratkaisemaan annosmäärien laskennan, reseptien tallettamisen ja kauppalistan jakamisen yhden selkeän käyttövirran kautta.**
