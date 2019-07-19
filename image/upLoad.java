package upLoadServlet;


import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
 
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

 


/**
 * Servlet implementation class upLoad
 */
@WebServlet("/upLoad")
public class upLoad extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public upLoad() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		/*response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		System.out.println(request.getParameter("name"));
		System.out.println(request);
		out.print("1");
		out.flush();
		out.close();*/
		String tempDirectory = "E:/temp/";    //Ҫ��������б��:temp/�������ļ�Ŀ¼
		try {
			response.setCharacterEncoding("UTF-8");
			int sizeThreshold = 1024 * 64;  //д���ô�С�Ļ���󣬴���Ӳ���С�
			File repositoryFile = new File(tempDirectory);
			PrintWriter out = response.getWriter();
			FileItemFactory factory = new DiskFileItemFactory(sizeThreshold, repositoryFile);
			ServletFileUpload upload = new ServletFileUpload(factory);
			upload.setHeaderEncoding("utf-8");	//�����ַ�����
			upload.setSizeMax(50 * 1024 * 1024); // set every upload file'size less than 50M
			List items = upload.parseRequest(request);   //���￪ʼִ���ϴ�
			Iterator iter = items.iterator();
			
			while (iter.hasNext()) {
				FileItem item = (FileItem) iter.next();   //FileItem���Ǳ�ʾһ������
				
				if(item.isFormField()){ //isFormField���������ж�FileItem�Ƿ����һ����ͨ����(����file����)
					System.out.println("***"+item.getFieldName());	
				}else {
					//String fieldName = item.getFieldName();  //��ȡ����name���Ե�ֵ
					//String fileName = item.getName();     //���ظ��ļ��ڿͻ����ϵ��ļ�����e.g: e:\dianying\\video\1.wmv
					//System.out.println("*****"+fieldName);
					//System.out.println("*****"+fileName);
					String path = item.getName();
					System.out.println(path);
				/*	String fileName = path.substring(path.lastIndexOf("\\"));*/
					File uploadedFile = new File("E:/temp/" + path);
					item.write(uploadedFile);
					out.print("�ϴ��ɹ�");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
