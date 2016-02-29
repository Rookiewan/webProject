<?php
	error_reporting(0);
	header("Content-Type: text/html;charset=utf-8");
	require_once 'db.php';
	class Dbservice_Lib{
		private $con;

		public function __construct(){
			$db=new db();
			$this->con=mysql_connect($db->getHost(),$db->getUsername(),$db->getPassword());
			if (!$this->con) {
				die('Could not connect:'.mysql_error());
			}
			mysql_select_db($db->getDB(),$this->con);
			mysql_query("set names utf8;");
		}
		//查询用
		public function execute_dql($sql){
			$result=mysql_query($sql,$this->con) or die(mysql_error());
			if($row=mysql_fetch_array($result)){
				return $row[0];
			}
		}
		//一条记录
		public function execute_sql_one($sql){
			$result=mysql_query($sql,$this->con) or die(mysql_error());
			if($row=mysql_fetch_assoc($result)){
				return $row;
			}
		}
		//返回数组型结果集
		public function execute_sql($sql){
			$array=array();
			$result=mysql_query($sql,$this->con) or die(mysql_error());
			$i=0;
			while ($row=mysql_fetch_assoc($result)) {
				$array[$i++]=$row;
			}
			mysql_free_result($result);
			return $array;
		}
		//返回数组型结果集个数
		public function execute_sql_count($sql){
			$result=mysql_query($sql,$this->con) or die(mysql_error());
			$i=0;
			while ($row=mysql_fetch_assoc($result)) {
				$i++;
			}
			mysql_free_result($result);
			return $i;
		}
		//返回结果集
		public function execute_sql_res(){
			$result=mysql_query($sql,$this->con) or die(mysql_error());
			return $result;
		}
		//增删改用
		public function execute_sql2($sql){
			$result=mysql_query($sql,$this->con) or die(mysql_error());
			if (!$result) {
				return -1;
			}
			if (mysql_affected_rows()>0) {
				return 1;//成功
			}else if(mysql_affected_rows()==0){
				return 0;//无影响
			}else{
				return -1;
			}
		}

		public function close_connect(){
			if(!empty($this->con)){
				mysql_close($this->con);
			}
		}
	}

?>