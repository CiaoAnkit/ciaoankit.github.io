/* This function will load script and call the callback once the script has loaded */
function loadScriptAsync(scriptSrc, callback) {
    if (typeof callback !== 'function') {
        throw new Error('In gtag.js: Not a valid callback for async script load.');
    }
    var script = document.createElement('script');
    script.onload = callback;
    script.src = scriptSrc;
    document.head.appendChild(script);
}

/* This is the part where you call the above defined function and "call back" your code which gets executed after the script has loaded */
loadScriptAsync('https://www.googletagmanager.com/gtag/js?id=UA-87653100-1', function(){
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-87653100-1', { 'anonymize_ip': true });
})


/*
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-87653100-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-87653100-1', { 'anonymize_ip': true });
  </script>
*/