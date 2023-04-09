#!/usr/bin/env python
# -*- coding: utf-8 -*-

import rospy
import numpy as np
import tf
import os
from pyproj import Proj
from std_msgs.msg import Float32MultiArray
from morai_msgs.msg import GPSMessage, EgoVehicleStatus


class LL2UTMConverter:
    def __init__(self, zone=52):

        self.gps_sub = rospy.Subscriber(
            "/gps", GPSMessage, self.navsat_callback)

        self.x, self.y = None, None

        # TODO1
        self.utm_pub = rospy.Publisher("/utm", Float32MultiArray, queue_size=1)
        self.proj_UTM = Proj(proj='utm', zone=52,
                             ellps='WGS84', preserve_units=False)
        self.utm_msg = Float32MultiArray()
        self.is_gps_data = False

        rate = rospy.Rate(30)
        while not rospy.is_shutdown():
            if self.is_gps_data == True:
                self.utm_pub.publish(self.utm_msg)
                print("data published at '/utm' topic !")
            else:
                print("waiting for data...")
            rate.sleep()

    # TODO2

    def navsat_callback(self, gps_msg):

        self.is_gps_data = True

        self.lat = gps_msg.longitude
        self.lon = gps_msg.latitude

        self.convertLL2UTM()

        utm_msg = Float32MultiArray()

        # TODO4
        utm_msg.data = [self.x, self.y]
        os.system('clear')
        print(' lat : ', self.lat)
        print(' lon : ', self.lon)
        print(' utm X : ', self.x)
        print(' utm Y : ', self.y)

    # TODO3

    def convertLL2UTM(self):

        xy_zone = self.proj_UTM(self.lat, self.lon)
        self.x = xy_zone[0]
        self.y = xy_zone[1]


if __name__ == '__main__':

    rospy.init_node('gps_parser', anonymous=True)

    gps_parser = LL2UTMConverter()

    rospy.spin()
