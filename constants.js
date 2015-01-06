global.CON_PLAYING    = 0;
global.CON_GET_NAME   = 2; // By what name ..?
global.CON_NAME_CNFRM = 3; // Did I get that right, x?
global.CON_PASSWORD   = 4; // Password:
global.CON_NEWPASSWD  = 5;	// Give me a password for x
global.CON_CNFPASSWD  = 6;	// Please retype password:
global.CON_QSEX       = 7; // Sex?
global.CON_QCLASS     = 8; // Class?
global.CON_RMOTD      = 9;
global.CON_MENU       = 10;


global.SECONDS_PER_MUDHOUR = 75;

global.PULSE_MOBILE = 10;   // 10 real seconds

global.GENDER_NEUTRAL = 0;
global.GENDER_MALE    = 1;
global.GENDER_FEMALE  = 2;

global.LVL_IMMORT = 31;
global.LVL_GOD    = 32;
global.LVL_GRGOD  = 33;
global.LVL_IMPL   = 34;

global.CLASS_UNDEFINED	 = -1;
global.CLASS_MAGIC_USER  = 0;
global.CLASS_CLERIC      = 1;
global.CLASS_THIEF       = 2;
global.CLASS_WARRIOR     = 3;

global.constitutionApplyType_Hitpoints = 0;
global.constitutionApplyType_Shock = 1;

/* [con] apply (all) */
global.constitutionApply = [
  [-4, 20],		/* con = 0 */
  [-3, 25],		/* con = 1 */
  [-2, 30],
  [-2, 35],
  [-1, 40],
  [-1, 45],		/* con = 5 */
  [-1, 50],
  [0, 55],
  [0, 60],
  [0, 65],
  [0, 70],		/* con = 10 */
  [0, 75],
  [0, 80],
  [0, 85],
  [0, 88],
  [1, 90],		/* con = 15 */
  [2, 95],
  [2, 97],
  [3, 99],		/* con = 18 */
  [3, 99],
  [4, 99],		/* con = 20 */
  [5, 99],
  [5, 99],
  [5, 99],
  [6, 99],
  [6, 99]		/* con = 25 */
];

global.wisdomApply = [
    0,   /* wis = 0 */
    0,   /* wis = 1 */
    0,
    0,
    0,
    0,  /* wis = 5 */
    0, 
    0, 
    0, 
    0, 
    0, /* wis = 10 */
    0, 
    2,
    2,
    3,
    3, /* wis = 15 */
    3, 
    4, 
    5, /* wis = 18 */
    6,
    6, /* wis = 20 */
    6,
    6,
    7,
    7,
    7 /* wis = 25 */
 ];