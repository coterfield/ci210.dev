<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Formepp extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */


	function __construct()
	{
		parent::__construct();

		/* Standard Libraries of codeigniter are required */
		$this->load->database();
		$this->load->helper('url');
		/* ------------------ */

		$this->load->library('grocery_CRUD');

	}

	public function index()
	{
	//	echo "<h1>Welcome to the world of Codeigniter</h1>";//Just an example to ensure that we get into the function
	//	die();
		$data['form_title'] = 'Formulario FormEPP';

		$this->load->helper(array('form', 'url'));

		$this->load->library('form_validation');

		$this->form_validation->set_rules('username', 'Username', 'trim|required|min_length[5]|max_length[12]|xss_clean');
		$this->form_validation->set_rules('password', 'Password', 'trim|required|matches[passconf]|md5');
		$this->form_validation->set_rules('passconf', 'Password Confirmation', 'trim|required');
		$this->form_validation->set_rules('email', 'Email', 'trim|required|valid_email');

		$this->load->view('template/pretmpl', $data);
		if ($this->form_validation->run() == FALSE)
		{
			$this->load->view('form_base');
		}
		else
		{
			$this->load->view('form_base');
		}
		$this->load->view('template/postmpl', $data);

	}

	public function cursos()
	{
		$this->grocery_crud->set_table('cursos');
		$output = $this->grocery_crud->render();

		echo "<pre>";
		print_r($output);
		echo "</pre>";
		die();
	}

	public function view($page = home)
	{

	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/formepp.php */