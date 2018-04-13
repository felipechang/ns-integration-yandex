# Overview
 Adds a translation feature to the NS address form using Yandex Translation Service translate.yandex.com
 
# Installation
Place the out javascript files in the SuiteScripts folder of your NetSuite account.

Create a Yandex Account:
1. Go to https://passport.yandex.com
2. Create an account
3. Generate an API key

Create an address field:
1. Customization > Lists, Records & Fields > Other Custom Fields
2. Make an Inline HTML field
3. Paste the code in yandex_address_translate_inline.html, on the Default Value field
4. Uncheck the Formula checkbox
5. Save 

This will add a translation button to all custom address forms, when pressed the address fields will be 
translated to the base language (defaults to english). 

You can reference the translation module from any script using require.

 

# Usage
```javascript
require([
        "/SuiteScripts/Yandex/yandex_translate_lib"
    ],

    function (Yandex) {

        //Use script parameter or Yandex API key
        var yandex = new Yandex.AddKey("custscript_yandex_key");

        //Detect text language
        var lang = yandex.detectLanguage("la vaca sombrero");
        //=> "es"

        //Translate text
        var res = yandex.translate("hola");
        //=> "hello"

        var res = yandex.translate([
            "hola",
            "como",
            "estas"
        ]);
        //=> ["hello","as","these"]
    });

```

# License
GNU GPL see LICENSE.

**Use at your own discretion. Test before using in production.**

# Author
Felipe Chang <felipechang@hardcake.org> @mr_pepian