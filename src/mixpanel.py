# Copyright 2015 - Escuela Técnica Superior de Ingenieros Informáticos - UPM
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.

"""
    In this file it is posible to find the code that enables the chance
    to get the info available in the Mixpanel service.
"""

import api_mixpanel

# The first step is to authenticate to get the info then

auth_info = api_mixpanel.Mixpanel(api_key="1fc2cdbcd86fda5e3cac1c05c621fcab", api_secret="c5c2ff034e73c179db2b38f84b2fc773")

