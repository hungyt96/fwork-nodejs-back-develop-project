const express = require('express');
const router = express();

const api = require('./api/api')
router.use('/', api);

const auth = require('./controllers/auth/api');
router.use('/auth', auth);

const base = require('./controllers/base/api');
router.use('/base', base);

const events = require('./controllers/events/api');
router.use('/events', events);

const export_import = require('./controllers/export_import/api');
router.use('/export_import', export_import);

const external_apps = require('./controllers/external_apps/api');
router.use('/external_apps', external_apps);

const feedback = require('./controllers/feedback/api');
router.use('/feedback', feedback);

const front = require('./controllers/front/api');
router.use('/front', front);

const hooks = require('./controllers/hooks/api');
router.use('/hooks', hooks);

const importer = require('./controllers/importer/api');
router.use('/importer', importer);

const locale = require('./controllers/locale/api');
router.use('/locale', locale);

const mdrender = require('./controllers/mdrender/api');
router.use('/mdrender', mdrender);

const permissions = require('./controllers/permissions/api');
router.use('/permissions', permissions);

const projects = require('./controllers/projects/api');
router.use('/projects', projects);

const works = require('./controllers/works/api');
router.use('/works', works);

const tasks = require('./controllers/tasks/api');
router.use('/tasks', tasks);

const task_statuses = require('./controllers/task-statuses/api');
router.use('/task-statuses', task_statuses);

const memberships = require('./controllers/memberships/api');
router.use('/memberships', memberships);

const searches = require('./controllers/searches/api');
router.use('/searches', searches);

const stats = require('./controllers/stats/api');
router.use('/stats', stats);

const timeline = require('./controllers/timeline/api');
router.use('/timeline', timeline);

const users = require('./controllers/users/api');
router.use('/users', users);

const userstorage = require('./controllers/userstorage/api');
router.use('/userstorage', userstorage);

const webhooks = require('./controllers/webhooks/api');
router.use('/webhooks', webhooks);

module.exports = router;