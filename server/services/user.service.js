var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

var ldap = require('ldapjs');

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;


// function authenticate(username, password) {
//     var deferred = Q.defer();
//     var user;

//     var client = ldap.createClient({
//         url: 'ldap://bluepages.ibm.com:389'
//     });

//     var opts = {
//         filter: '(emailAddress=' + username + ')',
//         scope: 'sub',
//         timeLimit: 500 
//     };
    
//     client.search('ou=bluepages,o=ibm.com', opts, function(err, res) {
//         if (err) {
//             console.log("ERROR: Cannot connect to LDAP");
//             console.error(err);
//         } else {
//             console.log("Connected to LDAP " + client.url.hostname);
//             res.on('searchEntry', function(entry) {
//                     user = entry.object;
//                     client.bind(user.dn, password, function(err, res) {
//                         if (err) {
//                             console.error(err.red);
//                             client.unbind();
//                         } 
//                         if (res) {
//                             var username = (user.emailAddress + '').split(',')[0];
//                             var firstName = capitalize(((user.cn + '').split(' ')[0]).toLowerCase());
//                             var lastName = capitalize(((user.cn + '').split(' ')[1]).toLowerCase());
//                             deferred.resolve({
//                                 username: username,
//                                 firstName: firstName,
//                                 lastName: lastName,
//                                 token: jwt.sign({ sub: user.username }, config.secret)
//                             });
//                             var department;
//                             if (user.dept == "01945") {
//                                 department = "DST"
//                             } else {
//                                 department = user.dept;
//                             }
//                             var userToAdd = {
//                                 username: username,
//                                 firstName: firstName,
//                                 lastName: lastName,
//                                 dept: department,
//                                 role: user.jobResponsibilities || user.jobresponsibilities
//                             }
//                             addUserToDb(userToAdd);
//                             client.unbind();
//                         } else {
//                             deferred.resolve();
//                         }
//                     })
//                 });
//             res.on('error', function(err) {
//                     console.error('error: ' + err.message);
//                     deferred.reject();
//                 });        
//             res.on('end', function(result) {
//                     console.log('status: ' + result.status);
//             });
//         }
//     });   

//     return deferred.promise;
// }

function authenticate(username, password) {
    var deferred = Q.defer();

    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            deferred.resolve({
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                token: jwt.sign({ sub: user._id }, config.secret)
            });
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();

    db.users.find().toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();

    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                deferred.reject('Username "' + userParam.username + '" is already registered.');
            } else {
                createUser();
            }
        });

    function createUser() {
        var user = _.omit(userParam, 'password');

        user.hash = bcrypt.hashSync(userParam.password, 10);

        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, userParam) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        var set = {
            firstName: userParam.firstName,
            lastName: userParam.lastName,
            username: userParam.username,
            roles: userParam.roles
        };

        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function addUserToDb(userParam) {
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) console.error(err.name + ': ' + err.message);

            if (user) {
                console.log('Username "' + userParam.username + '" is already registered. Proceding to login');
            } else {
                createUser();
            }
        });

    function createUser() {
        var user = userParam;
        db.users.insert(
            user,
            function (err, doc) {
                if (err) console.error(err.name + ': ' + err.message);

                console.log("New user added");
            });
    }
}

function capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}