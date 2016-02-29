<?

	class Index_Controller{
		public function main($getVars){
			$dbservice = new Dbservice_Lib();
			//$V=$getVars['V'];
			$A=$getVars['A'];
			if(empty($V)){
				$V='index';
			}
			if($A == 'add') {
				$postData = $getVars['postdata'];
				$username = $postData['username'];
				$projectName = $postData['projectName'];
				$projectDetail = $postData['projectDetail'];
				$startTime = $postData['startTime'];
				$finishedTime = $postData['finishedTime'];
				$projectProcess = $postData['projectProcess'];
				
				if(!empty($username) && !empty($projectName) && !empty($startTime) && !empty($finishedTime)) {
					if(empty($projectDetail)) $projectDetail = '无';

					$sql = 'insert into yy_webProject(username,projectName,projectDetail,startTime,finishedTime,projectProcess) values(\''.$username.'\',\''.$projectName.'\',\''.$projectDetail.'\',\''.$startTime.'\',\''.$finishedTime.'\','.$projectProcess.')';
					$rst = $dbservice->execute_sql2($sql);
					echo "{\"result\":\"".$rst."\"}";
				}else {
					echo "{\"result\":\"0\"}";//为空
				}
				return;
				/*
					username:1
					projectName:1
					projectDetail:1
					startTime:2015-09-14
					finishedTime:2015-09-19
				*/
			}
			if($A == 'upd') {
				$postData = $getVars['postdata'];
				$id = $getVars['id'];
				$username = $postData['username'];
				$projectName = $postData['projectName'];
				$projectDetail = $postData['projectDetail'];
				$startTime = $postData['startTime'];
				$finishedTime = $postData['finishedTime'];
				$projectProcess = $postData['projectProcess'];

				if(!empty($username) && !empty($projectName) && !empty($startTime) && !empty($finishedTime)) {
					if(empty($projectDetail)) $projectDetail = '无';

					$sql = 'update yy_webProject set username=\''.$username.'\',projectName=\''.$projectName.'\',projectDetail=\''.$projectDetail.'\',startTime=\''.$startTime.'\',finishedTime=\''.$finishedTime.'\',projectProcess=\''.$projectProcess.'\' where id=\''.$id.'\'';
					$rst = $dbservice->execute_sql2($sql);
					echo "{\"result\":\"".$rst."\"}";
				}else {
					echo "{\"result\":\"0\"}";//为空
				}
				return;
			}
			if($A == 'getData') {
				$selectedTime = $getVars['selectedTime'];
				$selectedUser = urldecode($getVars['selectedUser']);
				$rst = $this->getDuringTimeData($selectedUser,$selectedTime);
				echo json_encode(array('result' => $rst));
				return;
			}
			if($A == 'getAllData') {
				$sql = 'select * from yy_webProject';
				$rst = $dbservice->execute_sql($sql);
				echo json_encode(array('result' => $rst));
				return;
			}
			if($A == 'getUser') {
				$sql = 'select distinct  username from yy_webProject';
				$rst = $dbservice->execute_sql($sql);
				echo json_encode(array('users' => $rst));
				return;
			}
			if($A == 'finished') {
				$id = $getVars['id'];
				$sql = 'update yy_webProject set isFinished = 1 where id='.$id;
				$rst = $dbservice->execute_sql2($sql);
				echo "{\"result\":\"".$rst."\"}";
				return;
			}
			if($A == 'del') {
				$id = $getVars['id'];
				$sql = 'delete from yy_webProject where id='.$id;
				$rst = $dbservice->execute_sql2($sql);
				echo "{\"result\":\"".$rst."\"}";
				return;
			}
			if($A == 'getThisMonthHasP') {
				$thisMonth = $getVars['thisMonth'];
				$username = urldecode($getVars['username']);//用中文查数据库时需要 urldecode();

				if($username == 'all') {
					$sql = 'select startTime,isFinished from yy_webProject';
				}else {
					$sql = 'select startTime,isFinished from yy_webProject where username=\''.$username.'\'';
				}
				$rst = $dbservice->execute_sql($sql);
				echo json_encode(array('result' => $rst));
				return;
			}
			if($A == 'uploadNewProject') {
				$postData = $getVars['postdata']['data'];
				//echo $postData;
				foreach( $postData as $item) {
					$username = $item['username'];
					$projectName = $item['projectName'];
					$projectDetail = $item['projectDetail'];
					$startTime = $item['startTime'];
					$finishedTime = $item['finishedTime'];
					$projectProcess = $item['projectProcess'];
					if(!empty($username) && !empty($projectName) && !empty($startTime) && !empty($finishedTime)) {
						if(empty($projectDetail)) $projectDetail = '无';

						$sql = 'insert into yy_webProject(username,projectName,projectDetail,startTime,finishedTime,projectProcess) values(\''.$username.'\',\''.$projectName.'\',\''.$projectDetail.'\',\''.$startTime.'\',\''.$finishedTime.'\','.$projectProcess.')';
						$rst = $dbservice->execute_sql2($sql);
						echo "{\"result\":\"".$rst."\"}";
					}else {
						echo "{\"result\":\"0\"}";//为空
					}
				}
				return;
			}
			$view=new View_Model($V);
		}

		public function checkRepeat($filed1,$value1,$filed2,$value2){
			$sql = "select *from yoyaShared where ".$filed1."= '".$value1."' and  ".$filed2." = '".$value2."'";
			$dbservice = new Dbservice_Lib();
			return $rst = $dbservice->execute_sql_count($sql);//0 表示不重复
		}
		public function getDuringTimeData($user,$selectedTime) {
			$selectedTime = intval($selectedTime);
			if($user == 'all') {
				$sql = 'select *from yy_webProject';
			}else {
				$sql = 'select *from yy_webProject where username=\''.$user.'\'';
			}
			$dbservice = new Dbservice_Lib();
			$rst = $dbservice->execute_sql($sql);

			$returnArr = array();
			$str = '';
			foreach($rst as $k => $val) {
				$startTime = intval($val['startTime']) - 10000;
				$finishedTime = intval($val['finishedTime']) + 10000;//暂时差值，处理方案
				if($startTime <= $selectedTime && $finishedTime >= $selectedTime) {
					$returnArr[] = $val;
				}

			}
			return $returnArr;
			
		}
	}