export const METRIC_REPORT = {
  Drives: [
    { name: "Drives/G", column_name: "drives_diff" },
    { name: "Field Goals Made", column_name: "drive_fgm_diff" },
    { name: "Field Goals Attempted", column_name: "drive_fga_diff" },
    { name: "Points", column_name: "drive_pts_diff" },
  ],
  "Pull Up Shooting": [
    { name: "Field Goals Made", column_name: "pull_up_fgm_diff" },
    { name: "Field Goals Attempted", column_name: "pull_up_fga_diff" },
    { name: "Points", column_name: "pull_up_pts_diff" },
    { name: "Three Pointers Made", column_name: "pull_up_fg3m_diff" },
    { name: "Three Pointers Attempted", column_name: "pull_up_fg3a_diff" },
  ],
  "Catch and Shoot": [
    { name: "Field Goals Made", column_name: "catch_shoot_fgm_diff" },
    { name: "Field Goals Attempted", column_name: "catch_shoot_fga_diff" },
    { name: "Points", column_name: "catch_shoot_pts_diff" },
    { name: "Three Pointers Made", column_name: "catch_shoot_fg3m_diff" },
    { name: "Three Pointers Attempted", column_name: "catch_shoot_fg3a_diff" },
  ],
  "Open Three Pointers": [
    { name: "Three Pointers Points", column_name: "fg3_pts_diff_open" },
    { name: "Three Pointers Made", column_name: "fg3m_diff_open" },
    { name: "Three Pointers Attempted", column_name: "fg3a_diff_open" },
  ],
  "Contested Three Pointers": [
    { name: "Three Pointers Points", column_name: "fg3_pts_diff_tight" },
    { name: "Three Pointers Made", column_name: "fg3m_diff_tight" },
    { name: "Three Pointers Attempted", column_name: "fg3a_diff_tight" },
  ],
};
export const METRIC_SINGLE_GRAPH = {
  Drives: [
    { name: "Drives/G", column_name: "drives" },
    { name: "Field Goals Made", column_name: "drive_fgm" },
    { name: "Field Goals Attempted", column_name: "drive_fga" },
    { name: "Points", column_name: "drive_pts" },
  ],
  "Pull Up Shooting": [
    { name: "Points", column_name: "pull_up_pts" },
    { name: "Field Goals Made", column_name: "pull_up_fgm" },
    { name: "Field Goals Attempted", column_name: "pull_up_fga" },
    { name: "Three Pointers Made", column_name: "pull_up_fg3m" },
    { name: "Three Pointers Attempted", column_name: "pull_up_fg3a" },
  ],
  "Catch And Shoot": [
    { name: "Points", column_name: "catch_shoot_pts" },
    { name: "Field Goals Made", column_name: "catch_shoot_fgm" },
    { name: "Field Goals Attempted", column_name: "catch_shoot_fga" },
    { name: "Three Pointers Made", column_name: "catch_shoot_fg3m" },
    { name: "Three Pointers Attempted", column_name: "catch_shoot_fg3a" },
  ],
  "Open Three Pointers": [
    { name: "Three Pointers Points", column_name: "fg3_pts_open" },
    { name: "Three Pointers Made", column_name: "fg3m_open" },
    { name: "Three Pointers Attempted", column_name: "fg3a_open" },
  ],
  "Contested Three Pointers": [
    { name: "Three Pointers Points", column_name: "fg3_pts_tight" },
    { name: "Three Pointers Made", column_name: "fg3m_tight" },
    { name: "Three Pointers Attempted", column_name: "fg3a_tight" },
  ],
};
