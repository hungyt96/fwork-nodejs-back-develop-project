const {Project} = require('../projects/models/project');

// Get Discover Stats
const discover = (req, res) => {
		Project.countDocuments({}, function (err ,results){
				if (err) throw err;
				Project.countDocuments({'is_private': 'false'}, function (err ,results1){
						if (err) throw err;
						res.statusCode = 200;
						res.json({
							"projects": {
							"total projects private" : results - results1,
							"total projects public"  : results1
						}
			});
	});
});
};

const system = (req, res) => {
				const day = new Date();
				const today = new Date(day.getFullYear(), day.getMonth(), day.getDate());
				console.log(today);
			  const yesterday = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1);
				console.log(yesterday);
				Project.countDocuments({}, function (err ,results){
				if (err) throw err;
				res.statusCode = 200;
  			res.json({
				    "projects": {
				        "average_last_five_working_days": 0.0,
				        "average_last_seven_days": 0.0,
				        "percent_with_backlog": 0.0,
				        "percent_with_backlog_and_kanban": 100.0,
				        "percent_with_kanban": 0.0,
				        "today": today,
				        "total": results,
				        "total_with_backlog": 0,
				        "total_with_backlog_and_kanban": 7,
				        "total_with_kanban": 0
				    },
				    "users": {
				        "average_last_five_working_days": 0.0,
				        "average_last_seven_days": 0.0,
				        "counts_last_year_per_week": {
				            "2019-04-08": 11
				        },
				        "today": 10,
				        "total": 11
				    },
				    "userstories": {
				        "average_last_five_working_days": 0.0,
				        "average_last_seven_days": 0.0,
				        "today": 139,
				        "total": 139
				    }
  				});
			});
		};

module.exports = {
       discover,
       system
     };
