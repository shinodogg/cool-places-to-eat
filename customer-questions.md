Questions
====

## Question 1

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

In terms of Indexing, it is a process to make the data searchable. For example, if you want to search the item above with the word “smart” from a large amount of dataset quickly(like in a few milliseconds), you need to index the data in advance. Algolia can handle the indexing process, so you just need to upload the data to Algolia. You can see following page https://www.algolia.com/doc/guides/indexing/indexing-overview/ to understand indexing in Algolia.

As for Custom Ranking metrics, I recommend to see this youtube video https://youtu.be/ydam9FLJ5Ig. This is easy to understand.
<iframe width="560" height="315" src="https://www.youtube.com/embed/ydam9FLJ5Ig" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
Algolia's default ranking is textual relevance. If you want to sort the search results with specific business metrics like sales figures, numbers of endorsement, you can apply that field to the index as a custom ranking. As a side note, the custom ranking field type needs to be numerical or boolean.

## Question 2

Thank you for your insightful feedback. We want our customers to avoid unnecessary data loss accidents. While iterating, automated procedures might be accepted. Then, do you mind using APIs to clear or delete instead of doing manually on the dashboard? 

## Question 3

I don't believe it is heavy lifting. Create index, upload your data to Algolia, and search from your website. However, as you might know, it depends on your situation, environment, and so on. Could you give me details, or could we meet in person? I can give you a demo if needed.
