
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { needs, categories, priorities } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

const UrgentNeedsSection = () => {
  // Get top 3 urgent needs (high priority)
  const urgentNeeds = needs
    .filter(need => need.priority === 'high' && need.status === 'active')
    .slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Urgent Needs</h2>
            <p className="text-gray-600">These NGOs need immediate assistance. Can you help?</p>
          </div>
          <Link to="/needs" className="mt-4 md:mt-0">
            <Button variant="outline">View All Needs</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {urgentNeeds.map(need => {
            const progress = (need.quantityFulfilled / need.quantity) * 100;
            const category = categories[need.category];
            const priority = priorities[need.priority];
            
            return (
              <Card key={need.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{need.title}</CardTitle>
                    <Badge className={`${priority.color} capitalize`}>{priority.label}</Badge>
                  </div>
                  <Badge variant="outline" className="capitalize mt-2">
                    {category.label}
                  </Badge>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{need.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(progress)}% Complete</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Needed: {need.quantity}</span>
                      <span>Fulfilled: {need.quantityFulfilled}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-gray-50 py-3">
                  <Link to={`/needs/${need.id}`} className="w-full">
                    <Button variant="outline" className="w-full">Donate Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UrgentNeedsSection;
