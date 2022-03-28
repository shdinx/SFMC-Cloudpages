/* CREATE A JWT */
%%[
    SET @subscriberKey = "myTest"
    SET @jwt = GetJwtByKeyName("INT_PWD","HS256",Concat('{"subscriberKey":"',@subscriberKey,'"}'));

    Output(v(@jwt))
]%%
  
  
/* Unsecure CloudPage */
%%[
    SET @subscriberKey = _subscriberKey
    /* SET @subscriberKey = QueryParameter('subscriberKey') */
    SET @email = Lookup("Preference Demo ", "email", "subscriberKey", @subscriberKey)
    SET @name = Lookup("Preference Demo ", "name", "subscriberKey", @subscriberKey)
    SET @country = Lookup("Preference Demo ", "country", "subscriberKey", @subscriberKey)
    
    Output(ContentBlockbyKey("demo-cloudpage"))
]%%

  
/* Secure CloudPage with JWT */
<script runat="server" language="javascript">
    Platform.Load("Core", "1.1");
    Platform.Function.ContentBlockByKey("email360-ssjs-lib");

    try {
        var jwt = new jwt(),
            token = jwt.decode(Request.GetQueryStringParameter("jwt"),"INT_PWD");

        Variable.SetValue("@subscriberKey", token.subscriberKey);
    } catch(e) {
        Write(Stringify(e));
    }
</script>

%%[
    SET @email = Lookup("Preference Demo ", "email", "subscriberKey", @subscriberKey)
    SET @name = Lookup("Preference Demo ", "name", "subscriberKey", @subscriberKey)
    SET @country = Lookup("Preference Demo ", "country", "subscriberKey", @subscriberKey)
    
    Output(ContentBlockbyKey("demo-cloudpage"))
]%%



/* Secure CloudPage with JWT and SSJS Lib*/
<script runat="server" language="javascript">
    Platform.Load("Core", "1.1");
    Platform.Function.ContentBlockByKey("email360-ssjs-lib");

    var cp = new cloudpage({
            "jwt": "INT_PWD"
        });

    Variable.SetValue("@subscriberKey", cp.getPayload("jwt").subscriberKey);
</script>
%%[
    SET @email = Lookup("Preference Demo ", "email", "subscriberKey", @subscriberKey)
    SET @name = Lookup("Preference Demo ", "name", "subscriberKey", @subscriberKey)
    SET @country = Lookup("Preference Demo ", "country", "subscriberKey", @subscriberKey)
    
    Output(ContentBlockbyKey("demo-cloudpage"))
]%%
