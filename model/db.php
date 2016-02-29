<?php
	error_reporting(0);
	header("Content-Type: text/html;charset=utf-8");
	class db{
		private $host;
		private $username;
		private $password;
		private $db;
		public function __construct(){
			$this->host="127.0.0.1";
			$this->username="root";
			$this->password="946637";
			$this->db="test";
		}
		public function setHost($host){
			$this->host=$host;
		}
		public function getHost(){
			return $this->host;
		}
		public function setUsername($username){
			$this->username=$username;
		}
		public function getUsername(){
			return $this->username;
		}
		public function setPassword($password){
			$this->password=$password;
		}
		public function getPassword(){
			return $this->password;
		}
		public function setDB($db){
			$this->db=$db;
		}
		public function getDB(){
			return $this->db;
		}
	}

?>