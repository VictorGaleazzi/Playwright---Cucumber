import { Then, setDefaultTimeout } from "@cucumber/cucumber";
import ClientePage from "../../pages/clientePage";

import { fixture } from "../../hooks/pageFixture";

let clientePage: ClientePage;

setDefaultTimeout(60 * 1000 * 2)

Then('deve verificar que salvou com sucesso', async function () {
  
  clientePage = new ClientePage(fixture.page);

  await clientePage.verifyError();
});
