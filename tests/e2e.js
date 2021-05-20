const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    console.log("Browser opened.");

    const page = await browser.newPage();
    await page.goto('http://localhost:10000/');
 
    console.log("Page opened! Taking an screenshot...");

    await page.screenshot({ path: './tests/01.png' });
    
    const [response] = await Promise.all([
        page.waitForNavigation(),
        page.click("body > main > main > a"),
      ]);
      
    console.log("Clicked \"Contact table\" link, waiting for contacts...");
      
    await page.waitForTimeout(1000);  

    console.log("Timeout! Taking an screenshot...");

    await page.screenshot({ path: './tests/02.png' });

    var initialRowCount = (await page.$$("body > main > main > table > tbody > tr")).length;
    
    console.log(`Initial row count = ${initialRowCount}`);

    if(initialRowCount != 3){
        console.error("Inital row count is not 3");
        process.exit(1);
    }


    await page.click("#addContact");

    await page.waitForTimeout(1000);  

    var finalRowCount = (await page.$$("body > main > main > table > tbody > tr")).length;
    
    console.log(`Final row count = ${finalRowCount}`);

    if(finalRowCount != initialRowCount + 1){
        console.error("Row count doesn't increase when adding a contact");
        process.exit(1);
    }

    await browser.close();

    console.log("Browser closed!");

    process.exit(0);

})();

