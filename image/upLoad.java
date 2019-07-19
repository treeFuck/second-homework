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
		String tempDirectory = "E:/temp/";    //要在最后加上斜杠:temp/，缓存文件目录
		try {
			response.setCharacterEncoding("UTF-8");
			int sizeThreshold = 1024 * 64;  //写满该大小的缓存后，存入硬盘中。
			File repositoryFile = new File(tempDirectory);
			PrintWriter out = response.getWriter();
			FileItemFactory factory = new DiskFileItemFactory(sizeThreshold, repositoryFile);
			ServletFileUpload upload = new ServletFileUpload(factory);
			upload.setHeaderEncoding("utf-8");	//设置字符编码
			upload.setSizeMax(50 * 1024 * 1024); // set every upload file'size less than 50M
			List items = upload.parseRequest(request);   //这里开始执行上传
			Iterator iter = items.iterator();
			
			while (iter.hasNext()) {
				FileItem item = (FileItem) iter.next();   //FileItem就是表示一个表单域。
				
				if(item.isFormField()){ //isFormField方法用于判断FileItem是否代表一个普通表单域(即非file表单域)
					System.out.println("***"+item.getFieldName());	
				}else {
					//String fieldName = item.getFieldName();  //获取表单域name属性的值
					//String fileName = item.getName();     //返回该文件在客户机上的文件名。e.g: e:\dianying\\video\1.wmv
					//System.out.println("*****"+fieldName);
					//System.out.println("*****"+fileName);
					String path = item.getName();
					System.out.println(path);
				/*	String fileName = path.substring(path.lastIndexOf("\\"));*/
					File uploadedFile = new File("E:/temp/" + path);
					item.write(uploadedFile);
					out.print("上传成功");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
