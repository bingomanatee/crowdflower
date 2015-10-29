/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import { join } from 'path';
import { Router } from 'express';
import fs from '../utils/fs';

// A folder with Jade/Markdown/HTML content pages
const MENU_DATA_DIR = join(__dirname, './menu');

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    let fileName = join(MENU_DATA_DIR, 'menuData.json');
    const menuData = await fs.readFile(fileName, {encoding: 'utf8'});
    const menus = JSON.parse(menuData);
    let page = parseInt(req.query.page) || 0;
    page *= 8;

    const info = {
      totalItems: menus.menus.length,
      menus: menus.menus.slice(page, 8 + page)
    };

    res.status(200).send(info);
  } catch (err) {
    next(err);
  }
});

export default router;

