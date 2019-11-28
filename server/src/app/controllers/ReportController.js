import Report from '../models/Report';

class ReportController {
  async index(req, res) {
    const result = await Report.aggregate([
      {
        $project: {
          yearMonthDayUTC: {
            $dateToString: { format: '%Y-%m-%d', date: '$won_time' },
          },
          value: 1,
        },
      },
      {
        $group: {
          _id: '$yearMonthDayUTC',
          sum_of_value: { $sum: '$value' },
          deals: { $sum: 1 },
        },
      },
    ]);
    return res.json(result);
  }
}

export default new ReportController();
