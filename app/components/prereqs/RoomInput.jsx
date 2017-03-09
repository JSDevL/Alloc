import React from 'react'
const {connect} = require('react-redux');
const axios = require('axios');
/*  all required actions   */
const actions = require('blocksActions');
Object.assign(actions, require('alertActions'));
