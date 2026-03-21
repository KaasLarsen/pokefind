# Affiliate research (DK/EU): partnere + krav til links og disclosure

## Valgte affiliate-partnere/netværk (MVP)
1. `Amazon Associates` (typisk “Special Links” med tagget link-format pr. Amazon-site).
2. `eBay Partner Network (EPN)` (affiliate links via EPN trackning).
3. `Awin` (adMission disclosure-værktøj til at markere monetiserede links).
4. `Partner-ads` (dansk/nordisk affiliate-netværk; bruges af mindst én relevant konkurrent).

## Fælles krav vi implementerer i MVP
- Taggede/sporede links skal bruges (altså aldrig “rene” outbound links uden tracking hvis netværket kræver det).
- Affiliate/reklame må ikke skjules: disclosure skal stå tæt på den monetiserede handling/linket.
- “Disclosure i footer / Terms / About” alene er ikke nok, hvis der er affiliate links på siden.

## Partner 1: Amazon Associates
Krav til links:
- Links skal bruge Amazon’s special “tagged” link-formater (“Special Links”).

Krav til disclosure (på sitet):
- Amazon kræver en tydelig og prominente affiliate-disclosure med teksten (eller substantiativt lignende):
  - “As an Amazon Associate I earn from qualifying purchases.”

Implementeringsprincip i vores site:
- Vis disclosure tidligt på sider med affiliate links (fx en “Reklamelinks”-boks ovenfor første produktkreds).
- Brug samme disclosure-komponent på alle katalogsider/guides, der indeholder monetiserede links.

Kilde: Amazon Associates Program Operating Agreement.

## Partner 2: eBay Partner Network (EPN)
Krav til disclosure (generelle retningslinjer):
- Disclosure skal være til stede for alle live affiliate links.
- “Disclosure” skal være “unavoidable”, og så tæt som muligt på promoveringsindholdet/links/annoncer.
- Disclosure skal være synlig uden at brugeren skal søge/lede efter den eller klikke for at “se mere”.
- En disclosure kun i “Terms/Legal/About” er ikke tilstrækkeligt.

Eksempler på disclosures (i tekst):
- “This site contains affiliate links for which I may be compensated”
- “As an eBay Partner, I may be compensated if you make a purchase”

Implementeringsprincip:
- Label hver affiliate-outbound som “Reklamelink” ved siden af selve call-to-action knappen/linket.
- Hav også en kort page-level disclosure rettet mod EU/DK-forbrugere øverst på siden.

Kilde: eBay Partner Network “Affiliate Disclosure FAQs”.

## Partner 3: Awin
Krav til disclosure (praktisk tool-baseret):
- Awin tilbyder `adMission` som plug-and-play disclosure-værktøj.
- adMission kan:
  - Appendere en notifier/suffix til affiliate links (fx `*`, `#`, `#ad`) for at gøre monetisering synlig.
  - Vise en side-level disclosure-besked når monetiserede links findes.
  - (Valgfrit) tilføje `rel="sponsored"` ved links gennem SEO disclosure.

Implementeringsprincip:
- I MVP bygger vi en netværksagnostisk løsning (vores eget notifier/label UI), så vi ikke låser os til en specifik netværks-plugin.
- Når vi har Awin-konto: vi kan mappe Awin’s tracking-domæner til vores disclosure-komponent eller implementere `adMission`-agtig adfærd.

Kilde: Awin “Does Awin offer an ad disclosure tool?”.

## Partner 4: Partner-ads
Krav til markedsføring/disclosure:
- Partner-ads kræver, at indhold der fungerer som markedsføring for annoncøren markeres som en reklame (fx med teksten `Reklame`, `Sponsoreret`, `Indeholder reklamelinks` e.l.).
- Regler for display af reklameelementer: begrænsninger på antal bannere/tekstlinks pr. side samt krav om at reklamer kun må vises på egne websites/medier.

Implementeringsprincip:
- Vores site skal kunne markere “Reklamelinks” ved alle outbound affiliate links i samme komponent, uanset netværk.
- Vi designer UI’et til at støtte både “kort label ved linket” og “page-level disclosure”.

Kilde: Partner-ads “Brugerbetingelser for affiliate partnere”.

## Næste skridt (knytning til implementering)
- I `information-architecture` definerer vi datastrukturen, så hver anbefaling/butikskort altid har felter til:
  - `affiliateProgram` (hvilket netværk)
  - `disclosureLabel` (fx “Reklamelink”)
  - `outboundUrl` (tracket link)
- I `compliance-setup` implementerer vi:
  - page-level disclosure-boks
  - link-level “Reklamelink”-label ved hver CTA
  - `Privacy policy` og (når tracking/cookies kræver det) cookie-samtykke UI

