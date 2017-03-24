var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

module.exports = function (passport) {

    /* GET login page. */
    router.get('/', function (req, res) {
//        // Display the Login page with any flash message, if any
        res.render('index', {message: req.flash('message')});
    });
    
    /* GET Twitter View Page */
    router.get('/google', function (req, res) {
        res.render('google', {message: req.flash('message')});
    });

    /* GET Home Page */
    router.get('/users/home', isAuthenticated, function (req, res) {
        res.render('users/home', {user: req.user});
    });

    /* Handle Logout */
    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // route for google authentication and login
    // different scopes while logging in
    router.get('/login/google',
            passport.authenticate('google', {scope: ['profile', 'email']}
            ));

    // handle the callback after google has authenticated the user
    router.get('/login/google/callback',
            passport.authenticate('google', {
                successRedirect: '/users/home',
                failureRedirect: '/'
            })
            );

    // route for facebook authentication and login
    // different scopes while logging in
    router.get('/login/facebook',
            passport.authenticate('facebook', {scope: 'email'}
            ));

    // handle the callback after facebook has authenticated the user
    router.get('/login/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect: '/users/home',
                failureRedirect: '/'
            })
            );

    // route for linkedin authentication and login
    // different scopes while logging in
    router.get('/login/linkedIn',
            passport.authenticate('linkedin', {scope: ['r_emailaddress', 'r_basicprofile']}
            ));

    // handle the callback after facebook has authenticated the user
    router.get('/login/linkedIn/callback',
            passport.authenticate('linkedin', {
                successRedirect: '/users/home',
                failureRedirect: '/'
            })
            );

    // route for twitter authentication and login
    // different scopes while logging in
    router.get('/login/twitter',
            passport.authenticate('twitter'));

    // handle the callback after facebook has authenticated the user
    router.get('/login/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect: '/twitter',
                failureRedirect: '/'
            })
            );

    /* GET Twitter View Page */
    router.get('/twitter', isAuthenticated, function (req, res) {
        res.render('twitter', {user: req.user});
    });


// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================

    // local -----------------------------------
    router.get('/unlink/local', isAuthenticated, function (req, res) {
        var user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;
        user.save(function (err) {
            res.redirect('/users/home');
        });
    });

    // facebook -------------------------------
    router.get('/unlink/facebook', isAuthenticated, function (req, res) {
        var user = req.user;
        user.access_token = undefined;
        user.save(function (err) {
            res.redirect('/users/home');
        });
    });

    // twitter --------------------------------
    router.get('/unlink/twitter', isAuthenticated, function (req, res) {
        var user = req.user;
        user.access_token = undefined;
        user.save(function (err) {
            res.redirect('/users/home');
        });
    });

    // google ---------------------------------
    router.get('/unlink/google', isAuthenticated, function (req, res) {
        var user = req.user;
        user.access_token = undefined;
        user.save(function (err) {
            res.redirect('/users/home');
        });
    });

    return router;
}





