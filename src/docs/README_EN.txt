#==============================================================================
# UTA_CommonSaveMZ Plugin
#==============================================================================
#------------------------------------------------------------------------------
# Overview
#------------------------------------------------------------------------------
UTA_CommonSaveMZ plugin creates shared save data and shares the state of 
the specified switches/variables between game save data.
You can have it applied automatically at the time of save/load
according to your settings.

The "common save data" can be manipulated at any time by
using plugin commands.

It is useful when you want to manage game clear information and CG browsing 
information with switches and variables.
You don't need the knowledge of JavaScript, and can focus on creating your game 
with switch and variable operations.
In addition, because it uses an original save file, conflicts with other plugins are 
unlikely to occur.

This plugin creates shared save data as "common save data" separately
from game save datas.
In the local version, "common save data" files are created in
the save directory.
In web version, the "common save data" is saved in LocalStorage.

This plugin is not work RPG Maker MV.
It is for RPG Maker MZ only.
Please use the following plugin if you want to use it in RPG Maker MV.

* https://github.com/t-akatsuki/UTA_CommonSaveMV

#------------------------------------------------------------------------------
# How to use
#------------------------------------------------------------------------------
Copy "UTA_CommonSaveMZ.js" to your project, enable the plugin.
And please add the specify the switches and variables to be shared 
in plugin parameters.

Share processing is automatically performed at the timing of 
save and load according to the settings.

You can use shared save data at any time by using the plugin command.

Please refer to the plugin's help for detailed information.

#------------------------------------------------------------------------------
# Changelog
#------------------------------------------------------------------------------
* 0.9.1 (2020/11/11)
Fixed a bug that it doesn't work when the plugin parameter 
"Share target switches" or "Share target variables" is not specified.
Added English annotation and README_EN.txt.

* 0.9.0 (2020/08/22)
Beta version.
Remake for RPG Maker MV based on UTA_CommonSave plugin for RPG Maker MV.
Supports auto-save function.

#------------------------------------------------------------------------------
# License
#------------------------------------------------------------------------------
This plugin is under MIT License.

You can distribute, modify, and use it for commercial purposes, 
but you must include a copyright notice on the software and the full text of 
the MIT License or the URL of a web page containing the full text of 
the MIT License in the source code or in a separate file for licensing purposes 
that is included with the software.

There is no warranty for these software.
Even if any problem occurs by using these software, the author is not responsible for anything.

* You can use this software for both commercial and non-commercial purposes.
* We do not restrict the use of contents with age restrictions.
* The author will be happy if you report to us when you release your work.(Optional)

#------------------------------------------------------------------------------
# Contact
#------------------------------------------------------------------------------
+----------+------------------------------------------------+
| Author   | t-akatsuki                                     |
| WebSite  | https://www.utakata-no-yume.net                |
| GitHub   | https://github.com/t-akatsuki                  |
| Twitter  | https://twitter.com/t_akatsuki                 |
+----------+------------------------------------------------+
