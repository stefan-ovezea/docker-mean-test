var ldap = require('ldapjs');

var client = ldap.createClient({
    url: 'ldap://bluepages.ibm.com:389'
});

var opts = {
      filter: '(&(objectClass=groupOfUniqueNames)(cn=RO_DST_CLOUD))',
      scope: 'sub',
      timeLimit:500
      };

client.search('o=ibm.com', opts, function(err, res) {
    if (err) {
        console.log("ERROR: Cannot connect to LDAP");
        console.error(err);
    } else {
        console.log("Connected to LDAP " + client.url.hostname);

        res.on('searchEntry', function(entry) {
            console.log('entry: ' + JSON.stringify(entry.object));
        });
        res.on('error', function(err) {
            console.error('error: ' + err.message);
        });        
        res.on('end', function(result) {
            console.log('status: ' + result.status);
        });
    }
})