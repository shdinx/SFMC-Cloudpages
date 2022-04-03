Platform.Load("Core","1");
Platform.Function.ContentBlockByKey('demo-ssjs-lib-1.0.2'); // change this respectively to your enviroment.

var log = new logger('demo');
log.level = "DEBUG";

try {


    // var req = httpRequest("GET","https://rss.nytimes.com/services/xml/rss/nyt/World.xml");
    // var req = httpRequest("GET","https://www.salesforce.org/blog/feed/");
    var req = httpRequest("GET","https://trailblazer.salesforce.com/issues_index_rss?tag=Marketing%20Cloud%20Email%20Studio");

    var html = [],
        xml = req.content,
        json = convertXMLToJSON(xml);

    log.debug(json);

    var items = json.rss.channel.item;

    for (var i = 0; i < items.length; i++) {
        var title = items[i].title,
            link = items[i].link,
            description = items[i].description;
        html.push("<li><a href=\"" +link+ "\" target=\"_blank\">" + title + "</a><ul><li>" +description+ "</li></ul></li>");
    }

    Write("<h1>XML => JSON Demo</h1><ul>" + html.join('') + "</ul>");

} catch (e) {
    log.fatal(e);
}
