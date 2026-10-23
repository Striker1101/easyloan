#!/usr/bin/env node
'use strict';

// Configure environment before requiring react-scripts start
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.PORT = process.env.PORT || '3007';
process.env.BROWSER = process.env.BROWSER || 'none';
// CRA has a known issue where it terminates devServer when stdin emits 'end'
// Setting CI=true prevents the stdin listener from killing the process on start
process.env.CI = 'true';

require('react-scripts/scripts/start');
