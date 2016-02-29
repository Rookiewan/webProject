<?php
	class View_Model{
		private $data=array();


		private $render=FALSE;

		public function __construct($template){
			$file=SERVER_ROOT.'/view/'.strtolower($template).'.html';
			if(file_exists($file)){
				$this->render=$file;
			}
		}

		public function assign($variable,$value){
			$this->data[$variable]=$value;
		}

		public function __destruct(){
			$data=$this->data;

			include($this->render);
		}
	}

?>