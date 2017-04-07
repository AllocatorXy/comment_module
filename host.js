/**
 * date: 2017-03-13 18:22:25
 * author: AllocatorXy
 *
 ********************************
 * usage:
 *        /cmt?act=add&content=xxx  add a comment
 *            res: { err: 0, id: last_insert_id, time: add_time }
 *
 *        /cmt?act=get_page_count   get count of pages
 *            res: { err: 0, data: [ { count: count_of_pages } ] }
 *
 *        /cmt?act=get&page=x       get one page
 *            res: {
 *                err: 0,
 *                data: [
 *                    {
 *                        id: id,
 *                        content: "content",
 *                        time: add_time,
 *                        acc: praise_times,
 *                        ref: dislike_times
 *                    }, {...}, ...
 *                ]
 *            }
 *
 *        /cmt?act=acc&id=x         praise a comment
 *            res: { err: 0 }
 *
 *        /cmt?act=ref&id=x         dislike a comment
 *            res: { err: 0 }
 *
 *        /cmt?act=del&id=x         delete a comment
 *            res: { err: 0 }
 *
 ********************************
 */

'use strict';

const ex = require('express');
const st = require('express-static');
const mysql = require('mysql');
const server = ex();

/**
 * connect to database 'weibo'
 * @type {database}
 */
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '298319',
    database: 'weibo'
});

server.listen(80); // port
server.use(st('weibo')); // middleware

// comment module
const page_size = 6;
server.get('/cmt', (req, res) => { // get interface
    const act = req.query.act;
    const ID = req.query.id;
    switch (act) {
        case 'add':
            {
                const content = decodeURIComponent(req.query.content);
                if (!content) {
                    res.send({ err: 1, msg: '评论不能为空' });
                    res.end();
                } else {
                    const time = Math.floor(Date.now() / 1000);
                    db.query(`INSERT INTO comment (ID, content, time, acc, ref) VALUES(0, '${content}', ${time}, 0, 0)`, (err, data) => {
                        if (!err) {
                            const ID = data.insertId; // 获取刚插入的ID
                            res.send({ err: 0, ID, time });
                            res.end();
                        } else {
                            res.send({ err: 1, msg: 'data error' });
                            res.end();
                        }
                    });
                }
                break;
            }
        case 'get':
            {
                let page = req.query.page;
                if (!page) {
                    res.send({ err: 1, msg: '没这页' });
                    res.end();
                }
                if (page < 1) page = 1; // 不允许0页
                const s = (page - 1) * page_size; // 定位数据
                db.query(`SELECT ID, content, time, acc, ref FROM comment ORDER BY time DESC LIMIT ${s}, ${page_size}`, (err, data) => {
                    if (!err) {
                        res.send({ err: 0, data });
                        res.end();
                    } else {
                        res.send({ err: 1, msg: 'data error' });
                        res.end();
                    }
                });
                break;
            }
        case 'get_page_count':
            {
                db.query(`SELECT CASE WHEN mod(count(*),${page_size})>0 THEN count(*)/${page_size + 1} ELSE count(*)/${page_size} END as 'count'from comment`, (err, data) => {
                    if (!err) {
                        res.send({ err: 0, data });
                        res.end();
                    } else {
                        res.send({ err: 1, msg: 'data error' });
                        res.end();
                    }
                });
                break;
            }
        case 'acc':
            {
                db.query(`SELECT time FROM comment WHERE ID=${ID}`, (err, data) => {
                    if (!err) {
                        db.query(`UPDATE comment SET acc=acc+1 WHERE ID=${ID}`, (err, data) => {
                            res.send({ err: 0 });
                            res.end();
                        });
                    } else {
                        res.send({ err: 1, msg: '没这条评论' });
                        res.end();
                    }
                });
                break;
            }
        case 'ref':
            {
                db.query(`SELECT time FROM comment WHERE ID=${ID}`, (err, data) => {
                    if (!err) {
                        db.query(`UPDATE comment SET ref=ref+1 WHERE ID=${ID}`, (err, data) => {
                            res.send({ err: 0 });
                            res.end();
                        });
                    } else {
                        res.send({ err: 1, msg: '没这条评论' });
                        res.end();
                    }
                });
                break;
            }
        case 'del':
            {
                db.query(`DELETE FROM comment WHERE ID=${ID}`, (err, data) => {
                    if (!err) {
                        res.send({ err: 0 });
                        res.end();
                    } else {
                        res.send({ err: 1, msg: '没这条' });
                        res.end();
                    }
                });
                break;
            }
        default:
            res.send({ err: 1, msg: 'request error' });
            res.end();
            break;
    }
});
