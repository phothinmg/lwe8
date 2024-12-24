#!/usr/bin/env node

import $ from "dax-sh";
import { existsSync } from "node:fs";
import cleanDirectory from "./clean.js";
import { join } from "node:path";

const outDir = join(process.cwd(), "dist/config");
