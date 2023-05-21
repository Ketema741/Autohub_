require("dotenv").config()
const Job = require("../models/Job");

const { sendMail } = require("../configurations/mail");
const { uploadToCloudinary } = require("../configurations/cloudinary");

const addJob = async (req, res) => {
  const { title, description, address } = req.body;
  try {
    if (!title || !description || !address) {
      res.status(400);
      throw new Error("Please add all the required fields");
    }

    const employer = req.user;
    const job = await Job.create({
      title,
      description,
      address,
      employer,
    });
    if (job) {
      res.status(201).json({ job });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const cars = await Job.find({});
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      res.status(404);
      throw new Error("That job couldn't be found");
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);

    if (!job) {
      res.status(404);
      throw new Error("Couldn't find that job");
    }
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      data: updatedJob,
      message: "Job has been updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      res.status(404);
      throw new Error("That job does not exist couldnt't be deleted");
    }
    res.status(200).json({
      message: "Job has been deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const jobApplication = async (req, res) => {
  try {
    const { name, email, telephone, address, description } = req.body;
    const resume = req.file;
    const data = await uploadToCloudinary(resume.path, "Resumes");

    const { id } = req.params;
    console.log(id);
    const job = await Job.findById(id);
    if (!job) {
      res.status(404);
      throw new Error("That job does not exist");
    }
    const application = await Job.findByIdAndUpdate(
      { _id: id },
      {
        $addToSet: {
          applicants: {
            applicant_info: {
              name: name,
              email: email,
              telephone: telephone,
              address: address,
              description: description,
            },
            resume: {
              url: data.url,
              public_id: data.public_id,
            },
          },
        },
      },
      { new: true }
    );
    res.status(200).json({
      application,
      message: "Job has been updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const jobsAccptenceMail = async (req, res) => {
  try {
    const { name, email } = req.body;
    const job = await Job.findById(req.params.jobId)
    if(!job){
      res.status(404)
      throw new Error("Job couldn't be found")
    }
    if(!email || !name){
      res.status(400)
      throw new Error("No email address or name provided for mail destination. Please provide an email address and name")
    }
    let mailOptions = {
      subject: `Congrat! ${name}! Your application for ${job.title} has been accepted.`,
      Text: `Dear ${name},
  
        Thank you for your interest in our company and for submitting your application for the ${job.title} role. After careful consideration, we are pleased to inform you that your application has been accepted.
        We were impressed by your qualifications, skills, and experience, and we believe that you would be a great addition to our team. We are excited to offer you the position and look forward to welcoming you to the company.
        In the next few days, we will be sending you an email with more information about the role, including the start date, compensation, benefits, and other details. Please review this information carefully and let us know if you have any questions or concerns.
        Once again, congratulations on being accepted for the [Position] role. We are thrilled to have you join our team and look forward to working with you.
        
        Best regards,
        
        AutoHub vehicles service`,
      from: process.env.MAIL_USER,
      to: email,
      html: "<div>HTML version of the message</div>",
    };
    sendMail(mailOptions)
      .then((result) => {
        if (result) {
          return res.status(200).json({ message: "Email sent successfully" });
        }
      })
      .catch((error) =>
        res.status(400).json({
          message: error.message,
        })
      );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getJob,
  getJobs,
  addJob,
  updateJob,
  deleteJob,
  jobApplication,
  jobsAccptenceMail,
};
