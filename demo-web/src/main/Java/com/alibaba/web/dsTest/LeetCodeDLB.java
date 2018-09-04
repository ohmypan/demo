package com.alibaba.web.dsTest;

import java.util.Arrays;
import java.util.List;

/**
 * File：LeetCodeDLB <br>
 * Created on 2018/8/27.
 * Title:  <br>
 * Description: <br>
 * Company: wondersgroup.com <br>
 *
 * @author 潘国忠
 * @version 1.0
 */
public class LeetCodeDLB {
    class ListNode {
        int val;
        ListNode next;
        ListNode(int x) {
            val = x;
            next = null;
        }
     }
    public static int pivotIndex(int[] nums) {

        int point = -1;
        for(int i=1;i<nums.length;i++){
            int leftSum=0;
            int rightSum=0;
            for(int j= 0;j<i;j++){
                leftSum+=nums[j];
            }
            for(int j= i+1;j<nums.length;j++){
                rightSum+=nums[j];
            }
            if(leftSum==rightSum){
                point=i;
                break;
            }
        }
        return point;
    }
    public static int dominantIndex(int[] nums) {
        int max=0;
        int maxSn=0;
        for(int i=0;i<nums.length;i++){
            if(nums[i]>max){
                max=nums[i];
                maxSn=i;
            }
        }
        for(int i=0;i<nums.length;i++){
            if(i!=maxSn&&nums[i]!=0&&max!=0&&max/nums[i]>2){
                break;
            }
        }
        return maxSn;
    }
    public static void main(String[] args) {
    /*    int[] nums = {1, 7, 3, 6, 5, 6};
        int [] num={0,0,0,1};
        //int i=pivotIndex(nums);
        int i = dominantIndex(num);
        System.out.println(i);*/
        //String 1
   /*     String s1 = "Hello World";
        // 1. concatenate
        s1 += "!";
        System.out.println(s1);
        // 2. find
        System.out.println("The position of first 'o' is: " + s1.indexOf('o'));
        System.out.println("The position of last 'o' is: " + s1.lastIndexOf('o'));
        // 3. get substring
        System.out.println(s1.substring(6, 11));*/
        //String 2
     /*   String s = "Hello World";
        char[] str = s.toCharArray();
        str[5] = ',';
        System.out.println(str);*/

      /*  String ss1="hello";
        String ss2="ll";
        int i = strStr(ss1,ss2);
        System.out.println(i);*/

    /*    String [] ssm = {"flower","flow","flight"};
        String sb = longestCommonPrefix(ssm);
        System.out.println(sb);*/
        String a = "1010";
        String b = "1011";
        String sbb=addBinary(a,b);
        System.out.println(sbb);


    }
    //字符串
    public static int strStr(String haystack, String needle) {
        int i= haystack.indexOf(needle);
        return i;
    }

    public static String longestCommonPrefix(String[] strs) {
        List<String> s= Arrays.asList(strs);
        StringBuilder sb = new StringBuilder();
        sb.append("");
        String ss1=s.get(0);
        boolean flag = true;
        char[] sl = ss1.toCharArray();
        for(int i=0;i<s.size();i++){
            for (String s1:s){
                int j = s1.indexOf(sl[i]);
                if(j==-1){
                    flag=false;
                    break;
                }
            }
            if(!flag){
                break;
            }
            else{
                sb.append(sl[i]);
            }
        }

        return sb.toString();
    }

    public static String addBinary(String a, String b) {
        char [] aa = a.toCharArray();
        char [] bb = b.toCharArray();
        int min = 0;
        int max = 0;
        int count = 0;
        StringBuffer sb = new StringBuffer();
        if(aa.length>bb.length){
            min = bb.length;
            max = aa.length;
        }
        else{
            min = aa.length;
            max = bb.length;
        }
        for(int i = min-1;i>-1;i--){
            try{
                int j = Integer.valueOf(String.valueOf(aa[i])) +Integer.valueOf(String.valueOf(bb[i])) +count;
                if(j/2==1){
                    count=1;
                }
                else{
                    count=0;
                }
                sb.append(j%2);
            }catch (Exception e){

            }

        }
        if(count>0){
            sb.append(1);
        }

        return sb.reverse().toString();
    }
}
