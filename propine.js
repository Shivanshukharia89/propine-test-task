#!/usr/bin/env node

require('dotenv').config();
const { program } = require('commander');
const fs = require('fs')
const axios = require('axios');
const readline = require('readline');
const path = require('path');
