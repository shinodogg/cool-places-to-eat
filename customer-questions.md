Answers to the questions
====

## Answer to Question 1
Hello George,

Thank you for asking the question. 

Records are composed of fields, each of that contains one item of information. If you are familiar with RDBMS like MySQL, the concept of a record is similar to a row or tuple. As you can see the Algolia FAQ page https://www.algolia.com/doc/faq/basics/what-is-a-record/, following is an example of a record formatted in JSON.
<pre>
{
  "name": "Iphone 6 64Gb",
  "brand": "Apple",
  "color": "Gold",
  "categories": ["smartphone", "phone", "electronics"],
  "price": 789
}
</pre>

In terms of Indexing, it is a process to make the data searchable. For example, if you want to search the item above with the word “smart” and get millisecond results across millions of records, you need to index the data in advance. Algolia can handle the indexing process, so you just need to upload the data to Algolia. You can see following page to understand indexing in Algolia.
- Indexing Overview https://www.algolia.com/doc/guides/indexing/indexing-overview/ 

As for Custom Ranking metrics, I recommend to see this youtube video https://youtu.be/ydam9FLJ5Ig. This would be helpful to understand.

[![Custom Ranking](http://img.youtube.com/vi/ydam9FLJ5Ig/0.jpg)](http://www.youtube.com/watch?v=ydam9FLJ5Ig)

Algolia's default ranking is textual relevance. If you want to sort the search results with specific business metrics such as sales figures, numbers of endorsement, you can apply that field to the index as a custom ranking. As a side note, the custom ranking field type needs to be numerical or boolean.

Regards,
Eiji

## Answer to Question 2
Hello Matt,

Thank you for your insightful feedback.

We want our customers to avoid unnecessary data loss accidents. While iterating, automated procedures might be accepted. Then, do you mind using APIs to clear or delete instead of doing manually on the dashboard? Following is the reference of the APIs.

- Delete index API https://www.algolia.com/doc/api-reference/api-methods/delete-index/ 
- Clear index API https://www.algolia.com/doc/api-reference/api-methods/clear-index/

Best regards,
Eiji

## Answer to Question 3
Hi Leo,

I don't believe it is heavy lifting. Create index, upload your data to Algolia, and search from your website. However, as you might know, it depends on your situation, environment, and so on. Could you give me details, or could we meet in person? I can give you a demo if needed. 

If you have time and familiar with JavaScript, please try following Getting Started tutorial. 

- Getting started with Algolia and JavaScript https://www.algolia.com/doc/tutorials/getting-started/quick-start-with-the-api-client/javascript/

Best wishes,
Eiji
